import { defineTool } from '@usemcpkit/core';

export const issuesIssueLinkTypesCreateIssueLinkType = defineTool({
  name: 'issues:issue_link_types:create_issue_link_type',
  description:
    "Create issue link type. Creates an issue link type. Use this operation to create descriptions of the reasons why issues are linked. The issue link type consists of a name and descriptions for a link's inward and outward relationships.",
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the issue link type and is used as follows:',
      },
      inward: {
        type: 'string',
        description: 'The description of the issue link type inward link and is used as follows:',
      },
      name: {
        type: 'string',
        description: 'The name of the issue link type and is used as follows:',
      },
      outward: {
        type: 'string',
        description: 'The description of the issue link type outward link and is used as follows:',
      },
      self: {
        type: 'string',
        description: 'The URL of the issue link type. Read only.',
      },
    },
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/issueLinkType',
    body: ['id', 'inward', 'name', 'outward', 'self'],
  },
});
