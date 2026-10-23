import { defineTool } from '@usemcpkit/core';

export const projectsProjectComponentsGetComponentRelatedIssues = defineTool({
  name: 'projects:project_components:get_component_related_issues',
  description: 'Get component issues count. Returns the counts of issues assigned to the component.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the component.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/component/{id}/relatedIssueCounts',
  },
});
