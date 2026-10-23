import { defineTool } from '@usemcpkit/core';

export const securityVulnerabilitiesCreateVulnerabilitiesIssueLinks = defineTool({
  name: 'security:vulnerabilities:create_vulnerabilities_issue_links',
  description: 'Relate an issue to a vulnerability. Relates an issue to a vulnerability.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the vulnerability.',
      },
      target_issue_iid: {
        type: 'integer',
        description: 'Internal ID of the issue to relate to the vulnerability.',
      },
      target_project_id: {
        type: 'string',
        description: 'The ID of the target project',
      },
      link_type: {
        type: 'string',
        description: 'Link type',
        default: 'related',
      },
    },
    required: ['id', 'target_issue_iid'],
  },
  request: {
    method: 'POST',
    path: '/vulnerabilities/{id}/issue_links',
    body: ['target_issue_iid', 'target_project_id', 'link_type'],
  },
});
