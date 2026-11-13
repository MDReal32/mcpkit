use usemcpkit_manifest::Applies;
use usemcpkit_manifest::condition::{VersionCondition, parse_version_condition};

fn condition(text: &str) -> VersionCondition {
    text.to_owned().try_into().unwrap()
}

#[test]
fn reads_chains_and_joined_comparisons_alike() {
    for text in [
        "9.0 <= {version} < 10",
        "{version} >= 9.0 && {version} < 10",
        "{version}>=9.0&&10>{version}",
    ] {
        let condition = condition(text);
        assert!(condition.matches("9.0"), "{text}");
        assert!(condition.matches("9.4.3"), "{text}");
        assert!(!condition.matches("8.20"), "{text}");
        assert!(!condition.matches("10.0"), "{text}");
        assert!(!condition.matches("10"), "{text}");
    }
}

#[test]
fn compares_the_numbers_of_each_part() {
    assert!(condition("{version} > 3.9").matches("3.14"));
    assert!(condition("{version} == 10.3").matches("10.3.0"));
    assert!(condition("{version} != 10.3").matches("10.3.1"));
    assert!(condition("8.14 <= {version}").matches("10.3.27-ee"));
}

#[test]
fn reports_what_is_not_a_condition() {
    let errors: Vec<String> = [
        "",
        "{version}",
        "9.0 <= 10",
        "{version} < {version}",
        "{version} => 9",
        "{version} 9 10",
        "{version} >= 9. ",
        "{version} >= 9 &&",
        "{version} >= 9 || {version} < 8",
    ]
    .iter()
    .map(|text| parse_version_condition(text).unwrap_err())
    .collect();

    assert_eq!(
        errors,
        [
            "each part must compare {version} with a version, as in {version} >= 9.0",
            "each part must compare {version} with a version, as in {version} >= 9.0",
            "every comparison must have {version} on one side and a version on the other",
            "every comparison must have {version} on one side and a version on the other",
            "unexpected \"=\"",
            "an operator (<, <=, >, >=, ==, !=) must stand between two sides",
            "\"9.\" is not a version",
            "each part must compare {version} with a version, as in {version} >= 9.0",
            "unexpected \"|\"",
        ]
    );
}

#[test]
fn reads_and_writes_applies_with_the_condition_as_written() {
    let text = r#"{"sources":["datacenter"],"if":"9.0 <= {version} < 10"}"#;
    let applies: Applies = serde_json::from_str(text).unwrap();

    assert_eq!(
        applies.condition.as_ref().map(VersionCondition::text),
        Some("9.0 <= {version} < 10")
    );
    assert_eq!(serde_json::to_string(&applies).unwrap(), text);
    assert!(serde_json::from_str::<Applies>(r#"{"if":"9.0 <= 10"}"#).is_err());
}
