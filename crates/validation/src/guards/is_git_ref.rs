use crate::guards::is_word::is_word;

/// `^[A-Za-z0-9._][A-Za-z0-9._/-]*$`: a commit, tag or branch that `git` cannot take for an option.
pub fn is_git_ref(text: &str) -> bool {
    is_word(
        text,
        |first| first.is_ascii_alphanumeric() || "._".contains(first),
        |rest| rest.is_ascii_alphanumeric() || "._/-".contains(rest),
    )
}
