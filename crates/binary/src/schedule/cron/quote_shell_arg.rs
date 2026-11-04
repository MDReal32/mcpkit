/// Single-quotes an argument for the `/bin/sh` that cron runs each line with.
pub fn quote_shell_arg(arg: &str) -> String {
    format!("'{}'", arg.replace('\'', r"'\''"))
}
