use crate::config::jsonc::json_node::JsonNode;
use crate::config::jsonc::json_tree::JsonTree;
use crate::config::jsonc::node_kind::NodeKind;
use crate::config::jsonc::parse_error::ParseError;
use crate::config::jsonc::parse_error_code::ParseErrorCode;
use crate::config::jsonc::scanner::Scanner;
use crate::config::jsonc::syntax_kind::SyntaxKind;

/// jsonc-parser's `visit` with the visitor `parseTree` gives it, error recovery included, so the tree and the errors
/// come out as the TypeScript CLI sees them.
pub struct TreeParser<'a> {
    scanner: Scanner<'a>,
    allow_trailing_comma: bool,
    /// `nodes[0]` is the artificial array the root value is pushed into.
    nodes: Vec<JsonNode>,
    current: usize,
    errors: Vec<ParseError>,
}

impl<'a> TreeParser<'a> {
    pub fn new(text: &'a str, allow_trailing_comma: bool) -> Self {
        let holder = JsonNode {
            kind: NodeKind::Array,
            offset: 0,
            length: 0,
            parent: None,
            children: Vec::new(),
            value: None,
        };
        TreeParser {
            scanner: Scanner::new(text),
            allow_trailing_comma,
            nodes: vec![holder],
            current: 0,
            errors: Vec::new(),
        }
    }

    pub fn parse(mut self) -> JsonTree {
        self.parse_document();
        let root = self.nodes[0].children.first().copied();
        if let Some(root) = root {
            self.nodes[root].parent = None;
        }
        JsonTree {
            nodes: self.nodes,
            root,
            errors: self.errors,
        }
    }

    fn token(&self) -> SyntaxKind {
        self.scanner.token()
    }

    fn parse_document(&mut self) {
        self.scan_next();
        if self.token() == SyntaxKind::Eof {
            self.handle_error(ParseErrorCode::ValueExpected, &[], &[]);
            return;
        }
        if !self.parse_value() {
            self.handle_error(ParseErrorCode::ValueExpected, &[], &[]);
            return;
        }
        if self.token() != SyntaxKind::Eof {
            self.handle_error(ParseErrorCode::EndOfFileExpected, &[], &[]);
        }
    }

    fn scan_next(&mut self) -> SyntaxKind {
        loop {
            let token = self.scanner.scan();
            if let Some(error) = self.scanner.token_error() {
                self.handle_error(error.parse_error_code(), &[], &[]);
            }
            match token {
                SyntaxKind::LineComment | SyntaxKind::BlockComment | SyntaxKind::Trivia | SyntaxKind::LineBreak => {}
                SyntaxKind::Unknown => self.handle_error(ParseErrorCode::InvalidSymbol, &[], &[]),
                _ => return token,
            }
        }
    }

    fn handle_error(&mut self, code: ParseErrorCode, skip_until_after: &[SyntaxKind], skip_until: &[SyntaxKind]) {
        self.errors.push(ParseError {
            code,
            offset: self.scanner.token_offset(),
        });
        if skip_until_after.is_empty() && skip_until.is_empty() {
            return;
        }
        let mut token = self.token();
        while token != SyntaxKind::Eof {
            if skip_until_after.contains(&token) {
                self.scan_next();
                break;
            }
            if skip_until.contains(&token) {
                break;
            }
            token = self.scan_next();
        }
    }

    fn parse_value(&mut self) -> bool {
        match self.token() {
            SyntaxKind::OpenBracket => self.parse_array(),
            SyntaxKind::OpenBrace => self.parse_object(),
            SyntaxKind::String => self.parse_string(true),
            _ => self.parse_literal(),
        }
    }

    fn parse_string(&mut self, is_value: bool) -> bool {
        let value = self.scanner.token_value().to_owned();
        if is_value {
            self.on_literal(NodeKind::String, Some(value));
        } else {
            self.on_object_property(value);
        }
        self.scan_next();
        true
    }

    fn parse_literal(&mut self) -> bool {
        match self.token() {
            SyntaxKind::Number => {
                if self.scanner.token_value().parse::<f64>().is_err() {
                    self.handle_error(ParseErrorCode::InvalidNumberFormat, &[], &[]);
                }
                self.on_literal(NodeKind::Number, None);
            }
            SyntaxKind::Null => self.on_literal(NodeKind::Null, None),
            SyntaxKind::True | SyntaxKind::False => self.on_literal(NodeKind::Boolean, None),
            _ => return false,
        }
        self.scan_next();
        true
    }

    fn parse_property(&mut self) -> bool {
        let separators = [SyntaxKind::CloseBrace, SyntaxKind::Comma];
        if self.token() != SyntaxKind::String {
            self.handle_error(ParseErrorCode::PropertyNameExpected, &[], &separators);
            return false;
        }
        self.parse_string(false);
        if self.token() == SyntaxKind::Colon {
            self.on_separator(SyntaxKind::Colon);
            self.scan_next();
            if !self.parse_value() {
                self.handle_error(ParseErrorCode::ValueExpected, &[], &separators);
            }
        } else {
            self.handle_error(ParseErrorCode::ColonExpected, &[], &separators);
        }
        true
    }

    fn parse_object(&mut self) -> bool {
        self.on_container_begin(NodeKind::Object);
        self.scan_next();
        let mut needs_comma = false;
        while self.token() != SyntaxKind::CloseBrace && self.token() != SyntaxKind::Eof {
            if self.token() == SyntaxKind::Comma {
                if !needs_comma {
                    self.handle_error(ParseErrorCode::ValueExpected, &[], &[]);
                }
                self.on_separator(SyntaxKind::Comma);
                self.scan_next();
                if self.token() == SyntaxKind::CloseBrace && self.allow_trailing_comma {
                    break;
                }
            } else if needs_comma {
                self.handle_error(ParseErrorCode::CommaExpected, &[], &[]);
            }
            if !self.parse_property() {
                self.handle_error(
                    ParseErrorCode::ValueExpected,
                    &[],
                    &[SyntaxKind::CloseBrace, SyntaxKind::Comma],
                );
            }
            needs_comma = true;
        }
        self.on_object_end();
        if self.token() != SyntaxKind::CloseBrace {
            self.handle_error(ParseErrorCode::CloseBraceExpected, &[SyntaxKind::CloseBrace], &[]);
        } else {
            self.scan_next();
        }
        true
    }

    fn parse_array(&mut self) -> bool {
        self.on_container_begin(NodeKind::Array);
        self.scan_next();
        let mut needs_comma = false;
        while self.token() != SyntaxKind::CloseBracket && self.token() != SyntaxKind::Eof {
            if self.token() == SyntaxKind::Comma {
                if !needs_comma {
                    self.handle_error(ParseErrorCode::ValueExpected, &[], &[]);
                }
                self.on_separator(SyntaxKind::Comma);
                self.scan_next();
                if self.token() == SyntaxKind::CloseBracket && self.allow_trailing_comma {
                    break;
                }
            } else if needs_comma {
                self.handle_error(ParseErrorCode::CommaExpected, &[], &[]);
            }
            if !self.parse_value() {
                self.handle_error(
                    ParseErrorCode::ValueExpected,
                    &[],
                    &[SyntaxKind::CloseBracket, SyntaxKind::Comma],
                );
            }
            needs_comma = true;
        }
        self.on_array_end();
        if self.token() != SyntaxKind::CloseBracket {
            self.handle_error(ParseErrorCode::CloseBracketExpected, &[SyntaxKind::CloseBracket], &[]);
        } else {
            self.scan_next();
        }
        true
    }

    fn push_node(&mut self, kind: NodeKind, parent: usize, length: usize, value: Option<String>) -> usize {
        let index = self.nodes.len();
        self.nodes.push(JsonNode {
            kind,
            offset: self.scanner.token_offset(),
            length,
            parent: Some(parent),
            children: Vec::new(),
            value,
        });
        self.nodes[parent].children.push(index);
        index
    }

    fn ensure_property_complete(&mut self, end: usize) {
        let current = &mut self.nodes[self.current];
        if current.kind != NodeKind::Property {
            return;
        }
        current.length = end - current.offset;
        if let Some(parent) = current.parent {
            self.current = parent;
        }
    }

    fn token_end(&self) -> usize {
        self.scanner.token_offset() + self.scanner.token_length()
    }

    fn on_container_begin(&mut self, kind: NodeKind) {
        self.current = self.push_node(kind, self.current, 0, None);
    }

    fn on_object_property(&mut self, name: String) {
        let property = self.push_node(NodeKind::Property, self.current, 0, None);
        self.current = property;
        self.push_node(NodeKind::String, property, self.scanner.token_length(), Some(name));
    }

    fn close_current(&mut self) {
        let end = self.token_end();
        let current = &mut self.nodes[self.current];
        current.length = end - current.offset;
        if let Some(parent) = current.parent {
            self.current = parent;
        }
        self.ensure_property_complete(end);
    }

    fn on_object_end(&mut self) {
        self.ensure_property_complete(self.token_end());
        self.close_current();
    }

    fn on_array_end(&mut self) {
        self.close_current();
    }

    fn on_literal(&mut self, kind: NodeKind, value: Option<String>) {
        self.push_node(kind, self.current, self.scanner.token_length(), value);
        self.ensure_property_complete(self.token_end());
    }

    fn on_separator(&mut self, separator: SyntaxKind) {
        if separator == SyntaxKind::Comma && self.nodes[self.current].kind == NodeKind::Property {
            self.ensure_property_complete(self.scanner.token_offset());
        }
    }
}
