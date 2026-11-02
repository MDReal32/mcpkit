use std::path::PathBuf;

#[derive(Clone, Debug)]
pub struct WorkerLaunch {
    pub command: PathBuf,
    pub args: Vec<String>,
}
