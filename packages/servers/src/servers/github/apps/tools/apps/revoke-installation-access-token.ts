import { defineTool } from '@usemcpkit/core';

export const appsRevokeInstallationAccessToken = defineTool({
  name: 'apps:revoke_installation_access_token',
  description:
    "Revoke an installation access token. Revokes the installation token you're using to authenticate as an installation and access this endpoint.",
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'DELETE',
    path: '/installation/token',
  },
});
