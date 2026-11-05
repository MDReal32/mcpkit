/// The query of the redirect the browser was sent back with, in order.
#[derive(Clone, Debug, Default, PartialEq, Eq)]
pub struct CallbackParams(pub Vec<(String, String)>);

impl CallbackParams {
    /// The first value of `name`, like `URLSearchParams.get`.
    pub fn get(&self, name: &str) -> Option<&str> {
        self.0
            .iter()
            .find(|(key, _)| key == name)
            .map(|(_, value)| value.as_str())
    }
}
