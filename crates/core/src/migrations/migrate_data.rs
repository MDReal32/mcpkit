use crate::js::to_js_string;
use crate::migrations::consts::FIRST_VERSION;
use crate::migrations::migration::Migration;
use crate::migrations::read_version::read_version;
use serde_json::{Map, Value};

/// Runs the migrations from the data's version up to the latest, which is `migrations.len() + 1`, and stamps it. Data
/// from a newer version fails instead of being rewritten.
pub fn migrate_data(data: Value, migrations: &[Migration]) -> Result<Map<String, Value>, String> {
    let latest = FIRST_VERSION + migrations.len() as i64;
    let version_value = read_version(&data);
    let Value::Object(data) = data else {
        return Err("is not valid versioned data".to_owned());
    };
    let Some(version) = version_value
        .as_f64()
        .filter(|version| version.fract() == 0.0 && *version >= FIRST_VERSION as f64)
    else {
        return Err("is not valid versioned data".to_owned());
    };
    if version > latest as f64 {
        return Err(format!(
            "is version {}; this mcpkit reads up to version {latest}, update mcpkit",
            to_js_string(Some(&version_value))
        ));
    }
    let start = (version as i64 - FIRST_VERSION) as usize;
    let mut migrated = migrations[start..]
        .iter()
        .fold(data, |current, migrate| migrate(current));
    migrated.insert("version".to_owned(), Value::from(latest));
    Ok(migrated)
}

#[cfg(test)]
mod tests {
    use super::migrate_data;
    use crate::migrations::Migration;
    use serde_json::{Map, Value, json};

    const MIGRATIONS: &[Migration] = &[
        |mut data: Map<String, Value>| {
            data.insert("second".into(), json!(true));
            data
        },
        |mut data: Map<String, Value>| {
            data.insert("third".into(), json!(true));
            data
        },
    ];

    #[test]
    fn runs_the_migrations_from_the_data_version() {
        assert_eq!(
            Value::Object(migrate_data(json!({ "a": 1 }), MIGRATIONS).unwrap()),
            json!({ "a": 1, "second": true, "third": true, "version": 3 })
        );
        assert_eq!(
            Value::Object(migrate_data(json!({ "version": 2 }), MIGRATIONS).unwrap()),
            json!({ "version": 3, "third": true })
        );
    }

    #[test]
    fn refuses_invalid_and_newer_data() {
        assert_eq!(
            migrate_data(json!([]), MIGRATIONS).unwrap_err(),
            "is not valid versioned data"
        );
        assert_eq!(
            migrate_data(json!({ "version": "2" }), MIGRATIONS).unwrap_err(),
            "is not valid versioned data"
        );
        assert_eq!(
            migrate_data(json!({ "version": 1.5 }), MIGRATIONS).unwrap_err(),
            "is not valid versioned data"
        );
        assert_eq!(
            migrate_data(json!({ "version": 4 }), MIGRATIONS).unwrap_err(),
            "is version 4; this mcpkit reads up to version 3, update mcpkit"
        );
    }
}
