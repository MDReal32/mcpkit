import { defineTool } from '@usemcpkit/core';

export const codeQualityListFindingsForRepo = defineTool({
  name: 'code_quality:list_findings_for_repo',
  description: 'List code quality findings for a repository. Lists code quality findings for a repository.',
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
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      direction: {
        type: 'string',
        default: 'desc',
        enum: ['asc', 'desc'],
        description: 'The direction to sort the results by.',
      },
      before: {
        type: 'string',
        description:
          'A cursor, as given in the Link header. If specified, the query only searches for results before this cursor. For more information, see "Using pagination in the REST API."',
      },
      after: {
        type: 'string',
        description:
          'A cursor, as given in the Link header. If specified, the query only searches for results after this cursor. For more information, see "Using pagination in the REST API."',
      },
      state: {
        type: 'string',
        enum: ['open', 'dismissed'],
        description: 'If specified, only code quality findings with this state will be returned.',
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/code-quality/findings',
    query: ['per_page', 'direction', 'before', 'after', 'state'],
  },
});
