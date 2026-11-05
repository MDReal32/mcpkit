use usemcpkit_auth::AuthError;
use usemcpkit_auth::credentials::{CREDENTIALS_REQUEST_ELEMENT_ID, CredentialRequest};
use usemcpkit_core::js::to_js_json;

/// Puts the request into the page's empty JSON element; `<` is escaped so the data can never close the script. The
/// element is found the way the TypeScript pattern `(<script[^>]*\bid="…"[^>]*>)\s*(</script>)` finds it: the first
/// `<script` tag naming the id, followed by nothing but whitespace and `</script>`.
pub fn inject_credential_request(page: &str, request: &CredentialRequest) -> Result<String, AuthError> {
    let id_attribute = format!("id=\"{CREDENTIALS_REQUEST_ELEMENT_ID}\"");
    let element = page.match_indices("<script").find_map(|(start, _)| {
        let tag_length = page[start..].find('>')? + 1;
        let tag = &page[start..start + tag_length];
        let names_id = tag.match_indices(&id_attribute).any(|(at, _)| {
            let before = tag.as_bytes()[at - 1];
            !(before.is_ascii_alphanumeric() || before == b'_')
        });
        let open_end = start + tag_length;
        let content = &page[open_end..];
        let close_start = open_end + (content.len() - content.trim_start().len());
        (names_id && page[close_start..].starts_with("</script>")).then_some((open_end, close_start))
    });
    let Some((open_end, close_start)) = element else {
        return Err(AuthError(format!(
            "the credentials page has no empty #{CREDENTIALS_REQUEST_ELEMENT_ID} script element"
        )));
    };
    let value = serde_json::to_value(request).map_err(|error| AuthError(error.to_string()))?;
    let json = to_js_json(&value).replace('<', "\\u003c");
    Ok(format!("{}{json}{}", &page[..open_end], &page[close_start..]))
}

#[cfg(test)]
mod tests {
    use super::inject_credential_request;
    use indexmap::IndexMap;
    use usemcpkit_auth::credentials::CredentialRequest;

    fn request(server_name: &str) -> CredentialRequest {
        CredentialRequest {
            server_name: server_name.to_owned(),
            texts: IndexMap::new(),
            domain: None,
            domain_in_use: None,
            loopback_http: false,
            options: Vec::new(),
            sign_in: false,
        }
    }

    #[test]
    fn fills_the_first_empty_request_element_and_escapes_every_angle_bracket() {
        let page =
            "<script id=\"other\"></script><script type=\"application/json\" id=\"usemcpkit-request\">\n </script>";

        let injected = inject_credential_request(page, &request("</script><b>")).unwrap();

        assert_eq!(
            injected,
            "<script id=\"other\"></script><script type=\"application/json\" id=\"usemcpkit-request\">{\"serverName\":\"\\u003c/script>\\u003cb>\",\"texts\":{},\"options\":[],\"signIn\":false}</script>"
        );
    }

    #[test]
    fn refuses_a_page_without_an_empty_request_element() {
        for page in [
            "<p>x</p>",
            "<script id=\"usemcpkit-request\">x</script>",
            "<script xid=\"usemcpkit-request\"></script>",
        ] {
            let error = inject_credential_request(page, &request("demo")).unwrap_err();
            assert_eq!(
                error.0,
                "the credentials page has no empty #usemcpkit-request script element"
            );
        }
    }
}
