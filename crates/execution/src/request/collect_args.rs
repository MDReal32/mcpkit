use crate::args::{ArgValue, ToolArgs};
use indexmap::IndexMap;
use usemcpkit_manifest::tool::NameSelection;

/// The given arguments a request part names, under their outgoing keys.
pub fn collect_args(spec: Option<&NameSelection>, args: &ToolArgs) -> IndexMap<String, ArgValue> {
    let Some(spec) = spec else {
        return IndexMap::new();
    };
    spec.to_mapping()
        .into_iter()
        .filter_map(|(outgoing, arg_name)| Some((outgoing, args.get(&arg_name)?.clone())))
        .collect()
}
