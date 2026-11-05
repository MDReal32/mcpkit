use std::collections::HashMap;

/// The commit `ref` names in `git ls-remote` output: a tag is followed to its commit, then a branch, then any other
/// ref.
pub fn pick_remote_commit(output: &str, reference: &str) -> Option<String> {
    let commits: HashMap<&str, &str> = output
        .split('\n')
        .filter_map(|line| {
            let mut fields = line.split('\t');
            let commit = fields.next().filter(|commit| !commit.is_empty())?;
            let name = fields.next().filter(|name| !name.is_empty())?;
            Some((name, commit))
        })
        .collect();
    [
        format!("refs/tags/{reference}^{{}}"),
        format!("refs/tags/{reference}"),
        format!("refs/heads/{reference}"),
        format!("{reference}^{{}}"),
        reference.to_owned(),
    ]
    .iter()
    .find_map(|name| commits.get(name.as_str()).map(|commit| (*commit).to_owned()))
}

#[cfg(test)]
mod tests {
    use super::pick_remote_commit;

    #[test]
    fn follows_a_tag_before_a_branch_of_the_same_name() {
        let output = "aaa\trefs/heads/v1\nbbb\trefs/tags/v1\nccc\trefs/tags/v1^{}\nddd\tHEAD\n";

        assert_eq!(pick_remote_commit(output, "v1").as_deref(), Some("ccc"));
        assert_eq!(pick_remote_commit(output, "HEAD").as_deref(), Some("ddd"));
        assert_eq!(pick_remote_commit(output, "main"), None);
    }
}
