(function() {
    var implementors = Object.fromEntries([["polars_core",[["impl FromParallelIterator&lt;(<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.u32.html\">u32</a>, <a class=\"struct\" href=\"polars_utils/idx_vec/struct.UnitVec.html\" title=\"struct polars_utils::idx_vec::UnitVec\">UnitVec</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.u32.html\">u32</a>&gt;)&gt; for <a class=\"struct\" href=\"polars_core/frame/group_by/struct.GroupsIdx.html\" title=\"struct polars_core::frame::group_by::GroupsIdx\">GroupsIdx</a>"],["impl FromParallelIterator&lt;<a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.bool.html\">bool</a>&gt;&gt; for <a class=\"type\" href=\"polars_core/datatypes/type.BooleanChunked.html\" title=\"type polars_core::datatypes::BooleanChunked\">BooleanChunked</a>"],["impl FromParallelIterator&lt;<a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;<a class=\"struct\" href=\"polars_core/series/struct.Series.html\" title=\"struct polars_core::series::Series\">Series</a>&gt;&gt; for <a class=\"type\" href=\"polars_core/datatypes/type.ListChunked.html\" title=\"type polars_core::datatypes::ListChunked\">ListChunked</a>"],["impl FromParallelIterator&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.bool.html\">bool</a>&gt; for <a class=\"type\" href=\"polars_core/datatypes/type.BooleanChunked.html\" title=\"type polars_core::datatypes::BooleanChunked\">BooleanChunked</a>"],["impl&lt;Ptr&gt; FromParallelIterator&lt;<a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;Ptr&gt;&gt; for <a class=\"type\" href=\"polars_core/datatypes/type.BinaryChunked.html\" title=\"type polars_core::datatypes::BinaryChunked\">BinaryChunked</a><div class=\"where\">where\n    Ptr: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;[<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.u8.html\">u8</a>]&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a>,</div>"],["impl&lt;Ptr&gt; FromParallelIterator&lt;<a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;Ptr&gt;&gt; for <a class=\"type\" href=\"polars_core/datatypes/type.StringChunked.html\" title=\"type polars_core::datatypes::StringChunked\">StringChunked</a><div class=\"where\">where\n    Ptr: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.str.html\">str</a>&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a>,</div>"],["impl&lt;Ptr&gt; FromParallelIterator&lt;Ptr&gt; for <a class=\"type\" href=\"polars_core/datatypes/type.BinaryChunked.html\" title=\"type polars_core::datatypes::BinaryChunked\">BinaryChunked</a><div class=\"where\">where\n    Ptr: PolarsAsRef&lt;[<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.u8.html\">u8</a>]&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a> + NoOption,</div>"],["impl&lt;Ptr&gt; FromParallelIterator&lt;Ptr&gt; for <a class=\"type\" href=\"polars_core/datatypes/type.StringChunked.html\" title=\"type polars_core::datatypes::StringChunked\">StringChunked</a><div class=\"where\">where\n    Ptr: PolarsAsRef&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.str.html\">str</a>&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a> + NoOption,</div>"],["impl&lt;T&gt; FromParallelIterator&lt;&lt;T as <a class=\"trait\" href=\"polars_core/datatypes/trait.PolarsNumericType.html\" title=\"trait polars_core::datatypes::PolarsNumericType\">PolarsNumericType</a>&gt;::<a class=\"associatedtype\" href=\"polars_core/datatypes/trait.PolarsNumericType.html#associatedtype.Native\" title=\"type polars_core::datatypes::PolarsNumericType::Native\">Native</a>&gt; for <a class=\"struct\" href=\"polars_core/utils/struct.NoNull.html\" title=\"struct polars_core::utils::NoNull\">NoNull</a>&lt;<a class=\"struct\" href=\"polars_core/chunked_array/struct.ChunkedArray.html\" title=\"struct polars_core::chunked_array::ChunkedArray\">ChunkedArray</a>&lt;T&gt;&gt;<div class=\"where\">where\n    T: <a class=\"trait\" href=\"polars_core/datatypes/trait.PolarsNumericType.html\" title=\"trait polars_core::datatypes::PolarsNumericType\">PolarsNumericType</a>,</div>"],["impl&lt;T&gt; FromParallelIterator&lt;<a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;&lt;T as <a class=\"trait\" href=\"polars_core/datatypes/trait.PolarsNumericType.html\" title=\"trait polars_core::datatypes::PolarsNumericType\">PolarsNumericType</a>&gt;::<a class=\"associatedtype\" href=\"polars_core/datatypes/trait.PolarsNumericType.html#associatedtype.Native\" title=\"type polars_core::datatypes::PolarsNumericType::Native\">Native</a>&gt;&gt; for <a class=\"struct\" href=\"polars_core/chunked_array/struct.ChunkedArray.html\" title=\"struct polars_core::chunked_array::ChunkedArray\">ChunkedArray</a>&lt;T&gt;<div class=\"where\">where\n    T: <a class=\"trait\" href=\"polars_core/datatypes/trait.PolarsNumericType.html\" title=\"trait polars_core::datatypes::PolarsNumericType\">PolarsNumericType</a>,</div>"]]]]);
    if (window.register_implementors) {
        window.register_implementors(implementors);
    } else {
        window.pending_implementors = implementors;
    }
})()
//{"start":57,"fragment_lengths":[6611]}