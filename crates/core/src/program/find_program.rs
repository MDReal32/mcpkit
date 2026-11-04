use crate::env::Env;
use crate::program::consts::WINDOWS_DEFAULT_PATH_EXTENSIONS;
use crate::program::is_executable_file::is_executable_file;
use std::path::{Path, PathBuf};

/// The file a program resolves to: a name is looked up on the `PATH` of `env`, a path is taken as it is. On Windows
/// the `PATHEXT` extensions are tried too, so `npm` finds `npm.cmd`, which a plain spawn would not. Callers run exactly
/// this file.
pub fn find_program(command: &str, env: &Env) -> Result<Option<PathBuf>, std::io::Error> {
    let extensions: Vec<String> = match cfg!(windows) {
        true => std::iter::once(String::new())
            .chain(
                env.get("PATHEXT")
                    .unwrap_or(WINDOWS_DEFAULT_PATH_EXTENSIONS)
                    .split(';')
                    .map(str::to_owned),
            )
            .collect(),
        false => vec![String::new()],
    };
    let directories: Vec<PathBuf> = match Path::new(command).components().count() > 1 {
        true => vec![PathBuf::new()],
        false => std::env::split_paths(env.get("PATH").unwrap_or_default())
            .filter(|directory| !directory.as_os_str().is_empty())
            .collect(),
    };
    for directory in directories {
        for extension in &extensions {
            let candidate = directory.join(format!("{command}{extension}"));
            if is_executable_file(&candidate)? {
                return Ok(Some(candidate));
            }
        }
    }
    Ok(None)
}

#[cfg(test)]
mod tests {
    use super::find_program;
    use crate::env::Env;

    #[test]
    fn finds_a_program_on_path_and_takes_a_path_as_it_is() {
        let dir = std::env::temp_dir().join(format!("usemcpkit-find-program-{}", std::process::id()));
        std::fs::create_dir_all(&dir).unwrap();
        let file = dir.join(format!("tool{}", std::env::consts::EXE_SUFFIX));
        std::fs::copy(std::env::current_exe().unwrap(), &file).unwrap();
        let env = Env::from_pairs([
            ("PATH", dir.to_string_lossy().into_owned()),
            ("PATHEXT", ".exe".to_owned()),
        ]);

        let by_name = find_program("tool", &env).unwrap();
        let by_path = find_program(&dir.join("tool").to_string_lossy(), &env.with("PATH", "")).unwrap();
        let missing = find_program("usemcpkit-no-such-program", &env).unwrap();
        std::fs::remove_dir_all(&dir).unwrap();

        assert_eq!(by_name.as_deref(), Some(file.as_path()));
        assert_eq!(by_path.as_deref(), Some(file.as_path()));
        assert_eq!(missing, None);
    }
}
