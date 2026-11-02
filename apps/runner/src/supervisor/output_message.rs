use tokio::sync::oneshot;

pub enum OutputMessage {
    Line(String),
    Flush(oneshot::Sender<()>),
}
