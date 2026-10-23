import { defineTool } from '@usemcpkit/core';

export const reposDisableAutomatedSecurityFixes = defineTool({
  name: 'repos:disable_automated_security_fixes',
  description:
    'Disable Dependabot security updates. Disables Dependabot security updates for a repository. The authenticated user must have admin access to the repository. For more information, see "Configuring Dependabot security updates".',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'DELETE',
    path: '/repos/{owner}/{repo}/automated-security-fixes',
  },
});
