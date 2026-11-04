use crate::ResolvedAuth;
use crate::credentials::FormAnswer;
use std::rc::Rc;
use usemcpkit_manifest::Manifest;

/// The auth to send a call with.
#[derive(Clone, Debug, PartialEq)]
pub struct AuthResolution {
    pub auth: ResolvedAuth,
    /// The manifest to send with, its `{domain}` filled in.
    pub manifest: Rc<Manifest>,
    /// What the credentials form answered, saved only once the API accepts the call.
    pub save: Option<FormAnswer>,
}
