use crate::js::consts::{EXPONENT_ABOVE, EXPONENT_BELOW};
use serde_json::Number;

/// A number as JavaScript prints it: `2.0` is `2`, `-0` is `0`, and very large or small values use `1e+21` notation.
pub fn format_js_number(number: &Number) -> String {
    if number.is_i64() || number.is_u64() {
        return number.to_string();
    }
    let Some(value) = number.as_f64() else {
        return number.to_string();
    };
    if value == 0.0 {
        return "0".to_owned();
    }
    let magnitude = value.abs();
    if (EXPONENT_BELOW..EXPONENT_ABOVE).contains(&magnitude) {
        return value.to_string();
    }
    let scientific = format!("{value:e}");
    match scientific.split_once('e') {
        Some((mantissa, exponent)) if !exponent.starts_with('-') => format!("{mantissa}e+{exponent}"),
        _ => scientific,
    }
}

#[cfg(test)]
mod tests {
    use super::format_js_number;
    use serde_json::Number;

    fn format(value: f64) -> String {
        format_js_number(&Number::from_f64(value).unwrap())
    }

    #[test]
    fn prints_floats_as_javascript_does() {
        assert_eq!(format(2.0), "2");
        assert_eq!(format(-0.0), "0");
        assert_eq!(format(1.5), "1.5");
        assert_eq!(format(1e21), "1e+21");
        assert_eq!(format(1.5e-7), "1.5e-7");
        assert_eq!(format(123_456.789), "123456.789");
        assert_eq!(format_js_number(&Number::from(-3)), "-3");
    }
}
