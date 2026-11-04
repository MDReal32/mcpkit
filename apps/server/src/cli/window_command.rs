use crate::window::run_form_window;

pub fn window_command(url: &str) -> i32 {
    match run_form_window(url) {
        Ok(()) => 0,
        Err(error) => {
            eprintln!("usemcpkit: cannot open the form window: {error}");
            1
        }
    }
}
