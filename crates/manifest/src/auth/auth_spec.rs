use crate::auth::{BasicAuth, BearerAuth, HeaderAuth, OAuthAuth, QueryAuth};
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
#[serde(tag = "type", rename_all = "lowercase")]
pub enum AuthSpec {
    None,
    Bearer(BearerAuth),
    Header(HeaderAuth),
    Query(QueryAuth),
    Basic(BasicAuth),
    #[serde(rename = "oauth")]
    OAuth(OAuthAuth),
}
