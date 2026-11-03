/// One protocol line waiting for the writer, with the wire-log event it is recorded under.
pub struct OutgoingLine {
    pub text: String,
    pub event: &'static str,
}
