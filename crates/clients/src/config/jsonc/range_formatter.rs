use crate::config::jsonc::format_scope::FormatScope;
use crate::config::jsonc::scanner::Scanner;
use crate::config::jsonc::syntax_kind::SyntaxKind;
use crate::config::jsonc::text_edit::TextEdit;

/// The state of jsonc-parser's `format` for one range, with `insertSpaces`, `keepLines: false` and no final newline:
/// the only options `modify` formats its edits with here.
pub struct RangeFormatter<'a> {
    document: &'a str,
    scanner: Scanner<'a>,
    /// Where the scanned text starts in `document`: the beginning of the range's first line.
    text_start: usize,
    range_start: usize,
    range_end: usize,
    initial_indent_level: i64,
    indent_level: i64,
    indent: String,
    eol: &'static str,
    line_breaks: usize,
    has_error: bool,
    edits: Vec<TextEdit>,
}

impl<'a> RangeFormatter<'a> {
    pub fn new(scope: FormatScope<'a>) -> Self {
        RangeFormatter {
            document: scope.document,
            scanner: Scanner::new(&scope.document[scope.text_start..scope.text_end]),
            text_start: scope.text_start,
            range_start: scope.range_start,
            range_end: scope.range_end,
            initial_indent_level: scope.initial_indent_level as i64,
            indent_level: 0,
            indent: scope.indent,
            eol: scope.eol,
            line_breaks: 0,
            has_error: false,
            edits: Vec::new(),
        }
    }

    pub fn run(mut self) -> Vec<TextEdit> {
        let mut first = self.scan_next();
        if first != SyntaxKind::Eof {
            let first_token_start = self.token_start();
            let initial_indent = self.indent.repeat(self.initial_indent_level as usize);
            self.add_edit(&initial_indent, self.text_start, first_token_start);
        }
        while first != SyntaxKind::Eof {
            let mut first_token_end = self.token_end();
            let mut second = self.scan_next();
            let mut replace = String::new();
            let mut needs_line_break = false;
            while self.line_breaks == 0 && second.is_comment() {
                let comment_start = self.token_start();
                self.add_edit(" ", first_token_end, comment_start);
                first_token_end = self.token_end();
                needs_line_break = second == SyntaxKind::LineComment;
                replace = if needs_line_break {
                    self.new_line_and_indent()
                } else {
                    String::new()
                };
                second = self.scan_next();
            }
            match (second, first) {
                (SyntaxKind::CloseBrace, SyntaxKind::OpenBrace)
                | (SyntaxKind::CloseBracket, SyntaxKind::OpenBracket) => {}
                (SyntaxKind::CloseBrace | SyntaxKind::CloseBracket, _) => {
                    self.indent_level -= 1;
                    replace = self.new_line_and_indent();
                }
                _ => {
                    if let Some(between) = self.between_tokens(first, second, needs_line_break) {
                        replace = between;
                    }
                    if self.line_breaks > 0 && second.is_comment() {
                        replace = self.new_line_and_indent();
                    }
                }
            }
            if second == SyntaxKind::Eof {
                replace = String::new();
            }
            let second_token_start = self.token_start();
            self.add_edit(&replace, first_token_end, second_token_start);
            first = second;
        }
        self.edits
    }

    /// What goes between `first` and a `second` that does not close a container, or `None` to keep what was decided.
    fn between_tokens(&mut self, first: SyntaxKind, second: SyntaxKind, needs_line_break: bool) -> Option<String> {
        match first {
            SyntaxKind::OpenBracket | SyntaxKind::OpenBrace => {
                self.indent_level += 1;
                Some(self.new_line_and_indent())
            }
            SyntaxKind::Comma | SyntaxKind::LineComment => Some(self.new_line_and_indent()),
            SyntaxKind::BlockComment if self.line_breaks > 0 => Some(self.new_line_and_indent()),
            SyntaxKind::BlockComment | SyntaxKind::Colon if !needs_line_break => Some(" ".to_owned()),
            SyntaxKind::String if second == SyntaxKind::Colon && !needs_line_break => Some(String::new()),
            SyntaxKind::Null
            | SyntaxKind::True
            | SyntaxKind::False
            | SyntaxKind::Number
            | SyntaxKind::CloseBrace
            | SyntaxKind::CloseBracket => {
                if second.is_comment() && !needs_line_break {
                    return Some(" ".to_owned());
                }
                if second != SyntaxKind::Comma && second != SyntaxKind::Eof {
                    self.has_error = true;
                }
                None
            }
            SyntaxKind::Unknown => {
                self.has_error = true;
                None
            }
            _ => None,
        }
    }

    fn scan_next(&mut self) -> SyntaxKind {
        let mut token = self.scanner.scan();
        self.line_breaks = 0;
        while token == SyntaxKind::Trivia || token == SyntaxKind::LineBreak {
            if token == SyntaxKind::LineBreak {
                self.line_breaks = 1;
            }
            token = self.scanner.scan();
        }
        self.has_error = token == SyntaxKind::Unknown || self.scanner.token_error().is_some();
        token
    }

    fn token_start(&self) -> usize {
        self.scanner.token_offset() + self.text_start
    }

    fn token_end(&self) -> usize {
        self.token_start() + self.scanner.token_length()
    }

    fn new_line_and_indent(&self) -> String {
        let level = (self.initial_indent_level + self.indent_level).max(0) as usize;
        format!("{}{}", self.eol, self.indent.repeat(level))
    }

    fn add_edit(&mut self, content: &str, start: usize, end: usize) {
        let touches_range = start < self.range_end && end > self.range_start;
        let unchanged = self.document.as_bytes().get(start..end) == Some(content.as_bytes());
        if !self.has_error && touches_range && !unchanged {
            self.edits.push(TextEdit {
                offset: start,
                length: end - start,
                content: content.to_owned(),
            });
        }
    }
}
