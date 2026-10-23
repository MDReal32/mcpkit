import { defineTool } from "@usemcpkit/core";

export const reposReposCheckAutomatedSecurityFixes = defineTool({
  name: "repos:repos:check_automated_security_fixes",
  description:
    'Check if Dependabot security updates are enabled for a repository. Shows whether Dependabot security updates are enabled, disabled or paused for a repository. The authenticated user must have admin read access to the repository. For more information, see "Configuring Dependabot security updates".',
  input: {
    type: "object",
    properties: {
      owner: {
        type: "string",
        description: "The account owner of the repository. The name is not case sensitive.",
      },
      repo: {
        type: "string",
        description: "The name of the repository without the `.git` extension. The name is not case sensitive.",
      },
    },
    required: ["owner", "repo"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/automated-security-fixes",
  },
});
