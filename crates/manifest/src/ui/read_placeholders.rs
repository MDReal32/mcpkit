use crate::ui::find_placeholders::find_placeholders;

pub fn read_placeholders(template: &str) -> Vec<&str> {
    find_placeholders(template).into_iter().map(|(_, name)| name).collect()
}
