import { defineTool } from '@usemcpkit/core';

export const reposUpdateStatusCheckProtection = defineTool({
  name: 'repos:update_status_check_protection',
  description:
    "Update status check protection. Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see GitHub's products in the GitHub Help documentation.",
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
      branch: {
        type: 'string',
        description:
          'The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use the GraphQL API.',
      },
      strict: {
        type: 'boolean',
        description: 'Require branches to be up to date before merging.',
      },
      contexts: {
        type: 'array',
        description:
          '**Closing down notice**: The list of status checks to require in order to merge into this branch. If any of these checks have recently been set by a particular GitHub App, they will be required to come from that app in future for the branch to merge. Use `checks` instead of `contexts` for more fine-grained control.',
        items: {
          type: 'string',
        },
      },
      checks: {
        type: 'array',
        description: 'The list of status checks to require in order to merge into this branch.',
        items: {
          type: 'object',
          properties: {
            context: {
              type: 'string',
              description: 'The name of the required check',
            },
            app_id: {
              type: 'integer',
              description:
                'The ID of the GitHub App that must provide this check. Omit this field to automatically select the GitHub App that has recently provided this check, or any app if it was not set by a GitHub App. Pass -1 to explicitly allow any app to set the status.',
            },
          },
          required: ['context'],
        },
      },
    },
    required: ['owner', 'repo', 'branch'],
  },
  request: {
    method: 'PATCH',
    path: '/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks',
    body: ['strict', 'contexts', 'checks'],
  },
});
