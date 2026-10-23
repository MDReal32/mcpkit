import { defineTool } from '@usemcpkit/core';

export const adminGeoCreateGeoProxyGitSshInfoRefsUploadPack = defineTool({
  name: 'admin:geo:create_geo_proxy_git_ssh_info_refs_upload_pack',
  description:
    'Proxy a git-upload-pack info/refs request to the primary site. Proxies a git-upload-pack info/refs request from a secondary site to the primary site.',
  input: {
    type: 'object',
    properties: {
      secret_token: {
        type: 'string',
        description: 'Secret token used to authenticate requests from GitLab Shell.',
      },
      data: {
        type: 'object',
        description: 'Object that contains the payload data for the Geo operation.',
        properties: {
          gl_id: {
            type: 'string',
            description: 'ID of the user performing the operation.',
          },
          primary_repo: {
            type: 'string',
            description: 'Primary repository to clone or pull from.',
          },
        },
        required: ['gl_id', 'primary_repo'],
      },
    },
    required: ['secret_token', 'data'],
  },
  request: {
    method: 'POST',
    path: '/geo/proxy_git_ssh/info_refs_upload_pack',
    body: ['secret_token', 'data'],
  },
});
