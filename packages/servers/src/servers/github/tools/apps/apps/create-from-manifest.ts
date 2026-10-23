import { defineTool } from '@usemcpkit/core';

export const appsAppsCreateFromManifest = defineTool({
  name: 'apps:apps:create_from_manifest',
  description:
    "Create a GitHub App from a manifest. Use this endpoint to complete the handshake necessary when implementing the GitHub App Manifest flow. When you create a GitHub App with the manifest flow, you receive a temporary `code` used to retrieve the GitHub App's `id`, `pem` (private key), and `webhook_secret`.",
  input: {
    type: 'object',
    properties: {
      code: {
        type: 'string',
      },
    },
    required: ['code'],
  },
  request: {
    method: 'POST',
    path: '/app-manifests/{code}/conversions',
  },
});
