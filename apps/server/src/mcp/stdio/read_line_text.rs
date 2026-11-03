/// The text of one input line without its `\n` or `\r\n`; bytes that are not UTF-8 become U+FFFD and fail to parse.
pub fn read_line_text(buffer: &[u8]) -> String {
    let line = buffer.strip_suffix(b"\n").unwrap_or(buffer);
    let line = line.strip_suffix(b"\r").unwrap_or(line);
    String::from_utf8_lossy(line).into_owned()
}

#[cfg(test)]
mod tests {
    use super::read_line_text;

    #[test]
    fn drops_the_line_ending() {
        assert_eq!(read_line_text(b"{}\r\n"), "{}");
        assert_eq!(read_line_text(b"{}\n"), "{}");
        assert_eq!(read_line_text(b"{}"), "{}");
    }
}
