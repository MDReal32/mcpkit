import { defineTool } from '@usemcpkit/core';

export const cloudSpaceRolesGetAvailableSpaceRoles = defineTool({
  name: 'cloud:space_roles:get_available_space_roles',
  description: '[Cloud] Get available space roles. Retrieves the available space roles.',
  input: {
    type: 'object',
    properties: {
      space_id: {
        type: 'string',
        description:
          'The space ID for which to filter available space roles; if empty, return all available space roles for the tenant.',
      },
      role_type: {
        type: 'string',
        description: 'The space role type to filter results by.',
      },
      principal_id: {
        type: 'string',
        description:
          'The principal ID to filter results by. If specified, a principal-type must also be specified. Paired with a `principal-type` of `ACCESS_CLASS`, valid values include [`anonymous-users`, `jsm-project-admins`, `authenticated-users`, `all-licensed-users`, `all-product-admins`]',
      },
      principal_type: {
        type: 'string',
        description: 'The principal type to filter results by. If specified, a principal-id must also be specified.',
        enum: ['USER', 'GROUP', 'ACCESS_CLASS'],
      },
      cursor: {
        type: 'string',
        description:
          'Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the relative URL in the `Link` header to retrieve the `next` set of results.',
      },
      limit: {
        type: 'integer',
        description:
          'Maximum number of space roles to return. If more results exist, use the `Link` response header to retrieve a relative URL that will return the next set of results.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/space-roles',
    query: {
      'space-id': 'space_id',
      'role-type': 'role_type',
      'principal-id': 'principal_id',
      'principal-type': 'principal_type',
      cursor: 'cursor',
      limit: 'limit',
    },
  },
});
