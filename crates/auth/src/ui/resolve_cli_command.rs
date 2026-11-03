use crate::AuthError;
use crate::ui::cli_token_command::CliTokenCommand;
use crate::ui::to_web_host::to_web_host;
use mcpkit_manifest::ui::fill_template;

/// The arguments of a `cli` action with `{domain}` and `{webHost}` filled in; one that uses them needs a domain, and an
/// empty one counts as none, as in the TypeScript CLI.
pub fn resolve_cli_command(command: &str, args: &[String], domain: Option<&str>) -> Result<CliTokenCommand, AuthError> {
    let domain = domain.filter(|domain| !domain.is_empty());
    let values = [
        ("domain", domain.unwrap_or_default()),
        ("webHost", domain.map(to_web_host).unwrap_or_default()),
    ];
    let args = args
        .iter()
        .map(|arg| {
            let filled = fill_template(arg, &values);
            if filled != *arg && domain.is_none() {
                return Err(AuthError(format!("\"{command}\" needs a domain")));
            }
            Ok(filled)
        })
        .collect::<Result<_, _>>()?;
    Ok(CliTokenCommand {
        command: command.to_owned(),
        args,
    })
}

#[cfg(test)]
mod tests {
    use super::resolve_cli_command;
    use crate::ui::CliTokenCommand;

    #[test]
    fn fills_the_web_host_of_the_domain_into_the_arguments_and_needs_a_domain_for_it() {
        let args = [
            "auth".to_owned(),
            "token".to_owned(),
            "--hostname".to_owned(),
            "{webHost}".to_owned(),
        ];

        assert_eq!(
            resolve_cli_command("gh", &args, Some("api.github.com")).unwrap(),
            CliTokenCommand {
                command: "gh".into(),
                args: vec!["auth".into(), "token".into(), "--hostname".into(), "github.com".into()],
            }
        );
        assert_eq!(
            resolve_cli_command("gh", &args, None).unwrap_err().0,
            "\"gh\" needs a domain"
        );
        assert_eq!(
            resolve_cli_command("gh", &args[..2], None).unwrap().args,
            ["auth", "token"]
        );
    }
}
