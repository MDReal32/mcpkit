use crate::consts::UTF8_BOM;

#[derive(Clone, Debug, Default, PartialEq, Eq)]
pub struct HttpResponse {
    pub status: u16,
    pub content_type: Option<String>,
    pub body: Vec<u8>,
}

impl HttpResponse {
    /// A 2xx status, like fetch's `response.ok`.
    pub fn is_ok(&self) -> bool {
        (200..300).contains(&self.status)
    }

    /// The body decoded as UTF-8 the way fetch's `response.text()` does: without a byte order mark, and with invalid
    /// bytes replaced.
    pub fn text(&self) -> String {
        let bytes = self.body.strip_prefix(UTF8_BOM).unwrap_or(&self.body);
        String::from_utf8_lossy(bytes).into_owned()
    }
}
