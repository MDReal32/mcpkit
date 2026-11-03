use crate::server::{FormSession, read_json_body};
use crate::token_import::prepare_token_import::prepare_token_import;
use crate::token_import::read_cli_token::read_cli_token;
use hyper::body::Incoming;
use serde_json::{Map, Value, json};

/// The token answer an import request stands for, once the CLI printed the token.
pub async fn read_imported_answer(session: &FormSession, body: Incoming) -> Result<Value, String> {
    let plan = prepare_token_import(&session.request, &read_json_body(body).await?)?;
    let token = read_cli_token(&plan.cli, &session.env).await?;
    let mut answer = Map::new();
    answer.insert("method".to_owned(), json!("token"));
    answer.insert("option".to_owned(), json!(plan.option));
    answer.insert("values".to_owned(), json!({ plan.key: token }));
    if let Some(domain) = plan.domain {
        answer.insert("domain".to_owned(), json!(domain));
    }
    Ok(Value::Object(answer))
}
