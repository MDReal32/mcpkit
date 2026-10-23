import { defineTool } from '@usemcpkit/core';

export const issuesIssuesGetCreateIssueMeta = defineTool({
  name: 'issues:issues:get_create_issue_meta',
  description:
    '[Deprecated] Get create issue metadata. Returns details of projects, issue types within projects, and, when requested, the create screen fields for each issue type for the user. Use the information to populate the requests in Create issue and Create issues.',
  input: {
    type: 'object',
    properties: {
      projectIds: {
        type: 'string',
        description:
          'List of project IDs. This parameter accepts a comma-separated list. Multiple project IDs can also be provided using an ampersand-separated list. For example, `projectIds=10000,10001&projectIds=10020,10021`. This parameter may be provided with `projectKeys`. (comma-separated)',
      },
      projectKeys: {
        type: 'string',
        description:
          'List of project keys. This parameter accepts a comma-separated list. Multiple project keys can also be provided using an ampersand-separated list. For example, `projectKeys=proj1,proj2&projectKeys=proj3`. This parameter may be provided with `projectIds`. (comma-separated)',
      },
      issuetypeIds: {
        type: 'string',
        description:
          'List of issue type IDs. This parameter accepts a comma-separated list. Multiple issue type IDs can also be provided using an ampersand-separated list. For example, `issuetypeIds=10000,10001&issuetypeIds=10020,10021`. This parameter may be provided with `issuetypeNames`. (comma-separated)',
      },
      issuetypeNames: {
        type: 'string',
        description:
          'List of issue type names. This parameter accepts a comma-separated list. Multiple issue type names can also be provided using an ampersand-separated list. For example, `issuetypeNames=name1,name2&issuetypeNames=name3`. This parameter may be provided with `issuetypeIds`. (comma-separated)',
      },
      expand: {
        type: 'string',
        description:
          'Use expand to include additional information about issue metadata in the response. This parameter accepts `projects.issuetypes.fields`, which returns information about the fields in the issue creation screen for each issue type. Fields hidden from the screen are not returned. Use the information to populate the `fields` and `update` fields in Create issue and Create issues.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/issue/createmeta',
    query: ['projectIds', 'projectKeys', 'issuetypeIds', 'issuetypeNames', 'expand'],
  },
});
