import { defineTool } from "@usemcpkit/core";

export const reposReposEnableAutomatedSecurityFixes = defineTool({
  name: "repos:repos:enable_automated_security_fixes",
  description:
    'Enable Dependabot security updates. Enables Dependabot security updates for a repository. The authenticated user must have admin access to the repository. For more information, see "Configuring Dependabot security updates".',
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
    method: "PUT",
    path: "/repos/{owner}/{repo}/automated-security-fixes",
  },
});
