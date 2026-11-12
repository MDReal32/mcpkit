/// Whether listing the tools of a server may start its upstream.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum UpstreamListing {
    /// The upstream's tools are listed only when they are cached or it was started already.
    CachedOnly,
    /// The upstream is started when its tools are not known yet, which may sign in or clone its repository.
    Start,
}
