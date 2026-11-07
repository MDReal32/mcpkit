/// The size in whole logical pixels a page asked for; None for a value that is not a number in the range of `u32`.
pub fn parse_window_size(width: f64, height: f64) -> Option<(u32, u32)> {
    let range = 0.0..=f64::from(u32::MAX);
    let (width, height) = (width.round(), height.round());
    if !range.contains(&width) || !range.contains(&height) {
        return None;
    }
    Some((width as u32, height as u32))
}

#[cfg(test)]
mod tests {
    use super::parse_window_size;

    #[test]
    fn rounds_to_whole_pixels() {
        assert_eq!(parse_window_size(520.0, 411.6), Some((520, 412)));
    }

    #[test]
    fn refuses_what_does_not_fit() {
        assert_eq!(parse_window_size(-1.0, 100.0), None);
        assert_eq!(parse_window_size(100.0, f64::NAN), None);
        assert_eq!(parse_window_size(f64::INFINITY, 100.0), None);
        assert_eq!(parse_window_size(100.0, 5_000_000_000.0), None);
    }
}
