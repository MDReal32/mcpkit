/** The commit `ref` names in `git ls-remote` output: a tag is followed to its commit, then a branch, then any other ref. */
export const pickRemoteCommit = (output: string, ref: string) => {
  const commits = new Map(
    output.split("\n").flatMap((line) => {
      const [commit, name] = line.split("\t");
      return commit && name ? [[name, commit] as const] : [];
    }),
  );
  return (
    commits.get(`refs/tags/${ref}^{}`) ??
    commits.get(`refs/tags/${ref}`) ??
    commits.get(`refs/heads/${ref}`) ??
    commits.get(`${ref}^{}`) ??
    commits.get(ref)
  );
};
