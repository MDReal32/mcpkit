import { defineTool } from '@usemcpkit/core';

export const securityVulnerabilitiesDeleteVulnerabilitiesIssueLinks = defineTool({
  name: 'security:vulnerabilities:delete_vulnerabilities_issue_links',
  description:
    'Delete a link between an issue and a vulnerability. Deletes a link between an issue and a vulnerability.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the vulnerability.',
      },
      issue_link_id: {
        type: 'integer',
        description: 'ID of the vulnerability-issue link.',
      },
    },
    required: ['id', 'issue_link_id'],
  },
  request: {
    method: 'DELETE',
    path: '/vulnerabilities/{id}/issue_links/{issue_link_id}',
  },
});
