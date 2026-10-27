import type { ProjectInfo } from "../types/project-info";
import { parseRemoteHost } from "./parse-remote-host";
import { readGitOutput } from "./read-git-output";

/** The project a call belongs to: its git root (else the directory itself) and the host of its `origin` remote. */
export const resolveProject = async (directory: string) => {
  const root = await readGitOutput(directory, ["rev-parse", "--show-toplevel"]);
  const remote = root === undefined ? undefined : await readGitOutput(root, ["remote", "get-url", "origin"]);
  const project: ProjectInfo = { key: root ?? directory, remoteHost: remote && parseRemoteHost(remote) };
  return project;
};
