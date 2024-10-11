use arrow::legacy::time_zone::Tz;
use chrono::{Datelike, NaiveDateTime, NaiveTime};
use polars_core::chunked_array::temporal::time_to_time64ns;
use polars_core::prelude::*;
use polars_core::series::IsSorted;
use polars_utils::format_pl_smallstr;

use crate::prelude::*;

fn apply_time_add(
    start: i64,
    interval: &Duration,
    i: i64,
    tu: TimeUnit,
    tz: Option<&Tz>
) -> PolarsResult<i64> {
    match tu {
        TimeUnit::Nanoseconds => Duration::add_ns(&(*interval * i), start, tz),
        TimeUnit::Microseconds => Duration::add_us(&(*interval * i), start, tz),
        TimeUnit::Milliseconds => Duration::add_ms(&(*interval * i), start, tz),
    }
}


pub fn in_nanoseconds_window(ndt: &NaiveDateTime) -> bool {
    // ~584 year around 1970
    !(ndt.year() > 2554 || ndt.year() < 1386)
}

/// Create a [`DatetimeChunked`] from a given `start` and `end` date and a given `interval`.
pub fn date_range(
    name: PlSmallStr,
    start: NaiveDateTime,
    end: NaiveDateTime,
    interval: Duration,
    closed: ClosedWindow,
    tu: TimeUnit,
    tz: Option<&Tz>,
) -> PolarsResult<DatetimeChunked> {
    let (start, end) = match tu {
        TimeUnit::Nanoseconds => (
            start.and_utc().timestamp_nanos_opt().unwrap(),
            end.and_utc().timestamp_nanos_opt().unwrap(),
        ),
        TimeUnit::Microseconds => (
            start.and_utc().timestamp_micros(),
            end.and_utc().timestamp_micros(),
        ),
        TimeUnit::Milliseconds => (
            start.and_utc().timestamp_millis(),
            end.and_utc().timestamp_millis(),
        ),
    };
    datetime_range_impl(name, start, end, interval, closed, tu, tz)
}

#[doc(hidden)]
pub fn datetime_range_impl(
    name: PlSmallStr,
    start: i64,
    end: i64,
    interval: Duration,
    closed: ClosedWindow,
    tu: TimeUnit,
    tz: Option<&Tz>,
) -> PolarsResult<DatetimeChunked> {
    let out = Int64Chunked::new_vec(
        name,
        datetime_range_i64(start, end, interval, closed, tu, tz)?,
    );
    let mut out = match tz {
        #[cfg(feature = "timezones")]
        Some(tz) => out.into_datetime(tu, Some(format_pl_smallstr!("{}", tz))),
        _ => out.into_datetime(tu, None),
    };

    out.set_sorted_flag(IsSorted::Ascending);
    Ok(out)
}

/// Create a [`TimeChunked`] from a given `start` and `end` date and a given `interval`.
pub fn time_range(
    name: PlSmallStr,
    start: NaiveTime,
    end: NaiveTime,
    interval: Duration,
    closed: ClosedWindow,
) -> PolarsResult<TimeChunked> {
    let start = time_to_time64ns(&start);
    let end = time_to_time64ns(&end);
    time_range_impl(name, start, end, interval, closed)
}

#[doc(hidden)]
pub fn time_range_impl(
    name: PlSmallStr,
    start: i64,
    end: i64,
    interval: Duration,
    closed: ClosedWindow,
) -> PolarsResult<TimeChunked> {
    let mut out = Int64Chunked::new_vec(
        name,
        datetime_range_i64(start, end, interval, closed, TimeUnit::Nanoseconds, None)?,
    )
    .into_time();

    out.set_sorted_flag(IsSorted::Ascending);
    Ok(out)
}

/// vector of i64 representing temporal values
pub(crate) fn datetime_range_i64(
    start: i64,
    end: i64,
    interval: Duration,
    closed: ClosedWindow,
    tu: TimeUnit,
    tz: Option<&Tz>,
) -> PolarsResult<Vec<i64>> {
    if start > end {
        return Ok(Vec::new());
    }
    polars_ensure!(
        !interval.negative && !interval.is_zero(),
        ComputeError: "`interval` must be positive"
    );

    // Fast path when interval has only nsec interval component
    if interval.weeks()==0 && interval.months() == 0 && interval.days()==0 {
        let interval_nsec = interval.nanoseconds();
        match closed {
            ClosedWindow::Both => {
                return Ok((start..end).step_by(interval_nsec as usize).collect())
            }
            ClosedWindow::Left => {
                return Ok((start..end-interval_nsec).step_by(interval_nsec as usize).collect())
            }
            ClosedWindow::Right => {
                return Ok((start+interval_nsec..end).step_by(interval_nsec as usize).collect())
            }
            ClosedWindow::None => {
                return Ok((start+interval_nsec..end-interval_nsec).step_by(interval_nsec as usize).collect())
            }
        }
    }
    
    let size: usize = match tu {
        TimeUnit::Nanoseconds => ((end - start) / interval.duration_ns() + 1) as usize,
        TimeUnit::Microseconds => ((end - start) / interval.duration_us() + 1) as usize,
        TimeUnit::Milliseconds => ((end - start) / interval.duration_ms() + 1) as usize,
    };
    
    let size: usize;
    let offset_fn: fn(&Duration, i64, Option<&Tz>) -> PolarsResult<i64>;

    let mut ts = Vec::with_capacity(size);

    let mut i = match closed {
        ClosedWindow::Both | ClosedWindow::Left => 0,
        ClosedWindow::Right | ClosedWindow::None => 1,
    };
    
    let mut t = apply_time_add(start, &interval, i, tu, tz)?;
    i += 1;

    match closed {
        ClosedWindow::Both | ClosedWindow::Right => {
            while t <= end {
                ts.push(t);
                t = apply_time_add(start, &interval, i, tu, tz)?;
                i += 1;
            }
        }
        ClosedWindow::Left | ClosedWindow::None => {
            while t < end {
                ts.push(t);
                t = apply_time_add(start, &interval, i, tu, tz)?;
                i += 1;
            }
        }
    }
    
    debug_assert!(size >= ts.len());
    Ok(ts)
}
