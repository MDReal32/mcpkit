/// `URLSearchParams.set`: the first pair of that name takes the value and the others go; without one it is appended.
pub fn set_search_param(params: &mut Vec<(String, String)>, name: &str, value: &str) {
    let Some(first) = params.iter().position(|(key, _)| key == name) else {
        params.push((name.to_owned(), value.to_owned()));
        return;
    };
    params[first].1 = value.to_owned();
    let mut index = 0;
    params.retain(|(key, _)| {
        let keep = index <= first || key != name;
        index += 1;
        keep
    });
}

#[cfg(test)]
mod tests {
    use super::set_search_param;

    #[test]
    fn replaces_the_first_pair_and_drops_the_rest() {
        let pair = |key: &str, value: &str| (key.to_owned(), value.to_owned());
        let mut params = vec![pair("a", "1"), pair("b", "2"), pair("a", "3")];

        set_search_param(&mut params, "a", "x");
        set_search_param(&mut params, "c", "y");

        assert_eq!(params, [pair("a", "x"), pair("b", "2"), pair("c", "y")]);
    }
}
