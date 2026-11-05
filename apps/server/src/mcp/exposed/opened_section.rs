/// What calling a section gives back: the text for the model, and whether the tool list grew so the client must be told.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct OpenedSection {
    pub text: String,
    pub tools_changed: bool,
}
