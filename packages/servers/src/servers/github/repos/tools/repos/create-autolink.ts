import { defineTool } from '@usemcpkit/core';

export const reposCreateAutolink = defineTool({
  name: 'repos:create_autolink',
  description:
    'Create an autolink reference for a repository. Users with admin access to the repository can create an autolink.',
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
      key_prefix: {
        type: 'string',
        description:
          'This prefix appended by certain characters will generate a link any time it is found in an issue, pull request, or commit.',
      },
      url_template: {
        type: 'string',
        description:
          'The URL must contain `<num>` for the reference number. `<num>` matches different characters depending on the value of `is_alphanumeric`.',
      },
      is_alphanumeric: {
        type: 'boolean',
        description:
          'Whether this autolink reference matches alphanumeric characters. If true, the `<num>` parameter of the `url_template` matches alphanumeric characters `A-Z` (case insensitive), `0-9`, and `-`. If false, this autolink reference only matches numeric characters.',
        default: true,
      },
    },
    required: ['owner', 'repo', 'key_prefix', 'url_template'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/autolinks',
    body: ['key_prefix', 'url_template', 'is_alphanumeric'],
  },
});
