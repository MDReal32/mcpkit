/// What a listing found, with what it could not get: the manifest's own tools of a server are still listed when its
/// upstream fails to start, and the failure travels along to be shown to the model.
pub struct Listed<T> {
    pub items: Vec<T>,
    pub warnings: Vec<String>,
}

impl<T> Listed<T> {
    pub fn new(items: Vec<T>) -> Self {
        Listed {
            items,
            warnings: Vec::new(),
        }
    }

    pub fn with_warning(items: Vec<T>, warning: String) -> Self {
        Listed {
            items,
            warnings: vec![warning],
        }
    }
}
