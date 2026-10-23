import { defineTool } from '@usemcpkit/core';

export const issuesIssuePropertiesBulkSetIssuesPropertiesList = defineTool({
  name: 'issues:issue_properties:bulk_set_issues_properties_list',
  description:
    'Bulk set issues properties by list. Sets or updates a list of entity property values on issues. A list of up to 10 entity properties can be specified along with up to 10,000 issues on which to set or update that list of entity properties.',
  input: {
    type: 'object',
    properties: {
      entitiesIds: {
        type: 'array',
        description: 'A list of entity property IDs.',
        items: {
          type: 'integer',
        },
      },
      properties: {
        type: 'object',
        description: 'A list of entity property keys and values.',
      },
    },
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/issue/properties',
    body: ['entitiesIds', 'properties'],
  },
});
