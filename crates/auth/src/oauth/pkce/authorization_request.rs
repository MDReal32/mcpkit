#[derive(Clone, Debug, PartialEq, Eq)]
pub struct AuthorizationRequest<'a> {
    pub redirect_uri: &'a str,
    pub challenge: &'a str,
    pub state: &'a str,
}
