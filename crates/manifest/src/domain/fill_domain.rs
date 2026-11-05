use crate::domain::consts::DOMAIN_PLACEHOLDER;

pub fn fill_domain(template: &str, domain: &str) -> String {
    template.replace(DOMAIN_PLACEHOLDER, domain)
}
