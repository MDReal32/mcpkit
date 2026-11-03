use crate::config::jsonc::scan_error::ScanError;
use crate::config::jsonc::syntax_kind::SyntaxKind;

/// jsonc-parser's `createScanner(text, false)`, reading bytes instead of UTF-16 code units: every character it tells
/// apart is ASCII, so its offsets are UTF-8 byte offsets and stay consistent with the edits made from them.
pub struct Scanner<'a> {
    text: &'a [u8],
    pos: usize,
    value: String,
    token_offset: usize,
    token: SyntaxKind,
    error: Option<ScanError>,
}

impl<'a> Scanner<'a> {
    pub fn new(text: &'a str) -> Self {
        Scanner {
            text: text.as_bytes(),
            pos: 0,
            value: String::new(),
            token_offset: 0,
            token: SyntaxKind::Unknown,
            error: None,
        }
    }

    pub fn token(&self) -> SyntaxKind {
        self.token
    }

    /// The unescaped text of a string token, or the text of a number or keyword.
    pub fn token_value(&self) -> &str {
        &self.value
    }

    pub fn token_offset(&self) -> usize {
        self.token_offset
    }

    pub fn token_length(&self) -> usize {
        self.pos - self.token_offset
    }

    pub fn token_error(&self) -> Option<ScanError> {
        self.error
    }

    pub fn scan(&mut self) -> SyntaxKind {
        self.token = self.scan_token();
        self.token
    }

    fn byte(&self, pos: usize) -> Option<u8> {
        self.text.get(pos).copied()
    }

    fn scan_token(&mut self) -> SyntaxKind {
        self.value.clear();
        self.error = None;
        self.token_offset = self.pos;
        let Some(code) = self.byte(self.pos) else {
            self.token_offset = self.text.len();
            return SyntaxKind::Eof;
        };
        if Self::is_white_space(code) {
            while self.byte(self.pos).is_some_and(Self::is_white_space) {
                self.pos += 1;
            }
            return SyntaxKind::Trivia;
        }
        if Self::is_line_break(code) {
            self.pos += 1;
            if code == b'\r' && self.byte(self.pos) == Some(b'\n') {
                self.pos += 1;
            }
            return SyntaxKind::LineBreak;
        }
        match code {
            b'{' => self.punctuation(SyntaxKind::OpenBrace),
            b'}' => self.punctuation(SyntaxKind::CloseBrace),
            b'[' => self.punctuation(SyntaxKind::OpenBracket),
            b']' => self.punctuation(SyntaxKind::CloseBracket),
            b':' => self.punctuation(SyntaxKind::Colon),
            b',' => self.punctuation(SyntaxKind::Comma),
            b'"' => {
                self.pos += 1;
                self.value = self.scan_string();
                SyntaxKind::String
            }
            b'/' => self.scan_slash(),
            b'-' => {
                self.pos += 1;
                if !self.byte(self.pos).is_some_and(|next| next.is_ascii_digit()) {
                    return SyntaxKind::Unknown;
                }
                self.value = format!("-{}", self.scan_number());
                SyntaxKind::Number
            }
            b'0'..=b'9' => {
                self.value = self.scan_number();
                SyntaxKind::Number
            }
            _ => self.scan_word(),
        }
    }

    fn punctuation(&mut self, kind: SyntaxKind) -> SyntaxKind {
        self.pos += 1;
        kind
    }

    fn scan_slash(&mut self) -> SyntaxKind {
        let next = self.byte(self.pos + 1);
        if next == Some(b'/') {
            self.pos += 2;
            while self.byte(self.pos).is_some_and(|code| !Self::is_line_break(code)) {
                self.pos += 1;
            }
            return SyntaxKind::LineComment;
        }
        if next == Some(b'*') {
            self.pos += 2;
            let safe_length = self.text.len() - 1;
            let mut closed = false;
            while self.pos < safe_length {
                let code = self.text[self.pos];
                if code == b'*' && self.byte(self.pos + 1) == Some(b'/') {
                    self.pos += 2;
                    closed = true;
                    break;
                }
                self.pos += 1;
                if code == b'\r' && self.byte(self.pos) == Some(b'\n') {
                    self.pos += 1;
                }
            }
            if !closed {
                self.pos += 1;
                self.error = Some(ScanError::UnexpectedEndOfComment);
            }
            return SyntaxKind::BlockComment;
        }
        self.pos += 1;
        SyntaxKind::Unknown
    }

    fn scan_word(&mut self) -> SyntaxKind {
        while self.byte(self.pos).is_some_and(Self::is_unknown_content) {
            self.pos += 1;
        }
        if self.token_offset == self.pos {
            self.pos += 1;
            return SyntaxKind::Unknown;
        }
        match &self.text[self.token_offset..self.pos] {
            b"true" => SyntaxKind::True,
            b"false" => SyntaxKind::False,
            b"null" => SyntaxKind::Null,
            _ => SyntaxKind::Unknown,
        }
    }

    fn skip_digits(&mut self) {
        while self.byte(self.pos).is_some_and(|code| code.is_ascii_digit()) {
            self.pos += 1;
        }
    }

    fn scan_number(&mut self) -> String {
        let start = self.pos;
        if self.byte(self.pos) == Some(b'0') {
            self.pos += 1;
        } else {
            self.pos += 1;
            self.skip_digits();
        }
        if self.byte(self.pos) == Some(b'.') {
            self.pos += 1;
            if !self.byte(self.pos).is_some_and(|code| code.is_ascii_digit()) {
                self.error = Some(ScanError::UnexpectedEndOfNumber);
                return self.text_between(start, self.pos);
            }
            self.skip_digits();
        }
        let mut end = self.pos;
        if matches!(self.byte(self.pos), Some(b'E' | b'e')) {
            self.pos += 1;
            if matches!(self.byte(self.pos), Some(b'+' | b'-')) {
                self.pos += 1;
            }
            if self.byte(self.pos).is_some_and(|code| code.is_ascii_digit()) {
                self.skip_digits();
                end = self.pos;
            } else {
                self.error = Some(ScanError::UnexpectedEndOfNumber);
            }
        }
        self.text_between(start, end)
    }

    fn text_between(&self, start: usize, end: usize) -> String {
        String::from_utf8_lossy(&self.text[start..end]).into_owned()
    }

    /// Collects UTF-16 code units, as JavaScript strings hold them, so `\u` escapes of surrogate pairs join up.
    fn scan_string(&mut self) -> String {
        let mut units: Vec<u16> = Vec::new();
        let mut start = self.pos;
        loop {
            let Some(code) = self.byte(self.pos) else {
                self.push_text(&mut units, start);
                self.error = Some(ScanError::UnexpectedEndOfString);
                break;
            };
            if code == b'"' {
                self.push_text(&mut units, start);
                self.pos += 1;
                break;
            }
            if code == b'\\' {
                self.push_text(&mut units, start);
                self.pos += 1;
                let Some(escaped) = self.byte(self.pos) else {
                    self.error = Some(ScanError::UnexpectedEndOfString);
                    break;
                };
                self.pos += 1;
                self.read_escape(escaped, &mut units);
                start = self.pos;
                continue;
            }
            if code <= 0x1f {
                if Self::is_line_break(code) {
                    self.push_text(&mut units, start);
                    self.error = Some(ScanError::UnexpectedEndOfString);
                    break;
                }
                self.error = Some(ScanError::InvalidCharacter);
            }
            self.pos += 1;
        }
        String::from_utf16_lossy(&units)
    }

    fn read_escape(&mut self, escaped: u8, units: &mut Vec<u16>) {
        let unit = match escaped {
            b'"' | b'\\' | b'/' => u16::from(escaped),
            b'b' => 0x08,
            b'f' => 0x0c,
            b'n' => 0x0a,
            b'r' => 0x0d,
            b't' => 0x09,
            b'u' => match self.scan_hex_digits() {
                Some(unit) => unit,
                None => {
                    self.error = Some(ScanError::InvalidUnicode);
                    return;
                }
            },
            _ => {
                while self.byte(self.pos).is_some_and(|code| code & 0xc0 == 0x80) {
                    self.pos += 1;
                }
                self.error = Some(ScanError::InvalidEscapeCharacter);
                return;
            }
        };
        units.push(unit);
    }

    fn push_text(&self, units: &mut Vec<u16>, start: usize) {
        units.extend(String::from_utf8_lossy(&self.text[start..self.pos]).encode_utf16());
    }

    /// Four hex digits, or `None` when fewer follow (the ones read are consumed all the same).
    fn scan_hex_digits(&mut self) -> Option<u16> {
        let mut value: u16 = 0;
        for _ in 0..4 {
            let digit = self.byte(self.pos).and_then(|code| char::from(code).to_digit(16))?;
            value = value * 16 + digit as u16;
            self.pos += 1;
        }
        Some(value)
    }

    fn is_white_space(code: u8) -> bool {
        code == b' ' || code == b'\t'
    }

    fn is_line_break(code: u8) -> bool {
        code == b'\n' || code == b'\r'
    }

    fn is_unknown_content(code: u8) -> bool {
        !Self::is_white_space(code)
            && !Self::is_line_break(code)
            && !matches!(code, b'}' | b']' | b'{' | b'[' | b'"' | b':' | b',' | b'/')
    }
}
