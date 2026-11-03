use crate::consts::UTF8_BOM;

#[derive(Clone, Debug, Default, PartialEq, Eq)]
pub struct HttpResponse {
    pub status: u16,
    pub content_type: Option<String>,
    /// Every header with a value that is text, names in lowercase.
    pub headers: Vec<(String, String)>,
    pub body: Vec<u8>,
}

impl HttpResponse {
    /// A 2xx status, like fetch's `response.ok`.
    pub fn is_ok(&self) -> bool {
        (200..300).contains(&self.status)
    }

    /// The first value of the header `name`, matched without regard to case.
    pub fn header(&self, name: &str) -> Option<&str> {
        self.headers
            .iter()
            .find(|(candidate, _)| candidate.eq_ignore_ascii_case(name))
            .map(|(_, value)| value.as_str())
    }

    /// The body decoded as UTF-8 the way fetch's `response.text()` does: without a byte order mark, and with invalid
    /// bytes replaced.
    pub fn text(&self) -> String {
        let bytes = self.body.strip_prefix(UTF8_BOM).unwrap_or(&self.body);
        String::from_utf8_lossy(bytes).into_owned()
    }
}
