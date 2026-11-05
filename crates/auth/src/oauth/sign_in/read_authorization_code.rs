use crate::AuthError;
use crate::oauth::sign_in::callback_params::CallbackParams;

pub fn read_authorization_code(
    params: &CallbackParams,
    expected_state: &str,
    server_name: &str,
) -> Result<String, AuthError> {
    if let Some(error) = params.get("error").filter(|error| !error.is_empty()) {
        let detail = params.get("error_description").unwrap_or(error);
        return Err(AuthError(format!("{server_name}: authorization denied: {detail}")));
    }
    if params.get("state") != Some(expected_state) {
        return Err(AuthError(format!(
            "{server_name}: authorization state mismatch, sign-in aborted"
        )));
    }
    match params.get("code").filter(|code| !code.is_empty()) {
        Some(code) => Ok(code.to_owned()),
        None => Err(AuthError(format!("{server_name}: authorization callback has no code"))),
    }
}

#[cfg(test)]
mod tests {
    use super::read_authorization_code;
    use crate::oauth::sign_in::CallbackParams;

    fn params(pairs: &[(&str, &str)]) -> CallbackParams {
        CallbackParams(
            pairs
                .iter()
                .map(|(key, value)| ((*key).to_owned(), (*value).to_owned()))
                .collect(),
        )
    }

    #[test]
    fn reads_the_code_of_the_expected_state() {
        let read =
            |pairs: &[(&str, &str)]| read_authorization_code(&params(pairs), "s", "demo").map_err(|error| error.0);

        assert_eq!(read(&[("code", "c"), ("state", "s")]), Ok("c".to_owned()));
        assert_eq!(
            read(&[("error", "access_denied"), ("error_description", "")]),
            Err("demo: authorization denied: ".to_owned())
        );
        assert_eq!(
            read(&[("error", "access_denied")]),
            Err("demo: authorization denied: access_denied".to_owned())
        );
        assert_eq!(
            read(&[("code", "c"), ("state", "forged")]),
            Err("demo: authorization state mismatch, sign-in aborted".to_owned())
        );
        assert_eq!(
            read(&[("state", "s")]),
            Err("demo: authorization callback has no code".to_owned())
        );
    }
}
