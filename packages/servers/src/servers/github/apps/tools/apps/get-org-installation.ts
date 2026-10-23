import { defineTool } from '@usemcpkit/core';

export const appsGetOrgInstallation = defineTool({
  name: 'apps:get_org_installation',
  description:
    "Get an organization installation for the authenticated app. Enables an authenticated GitHub App to find the organization's installation information.",
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/installation',
  },
});
