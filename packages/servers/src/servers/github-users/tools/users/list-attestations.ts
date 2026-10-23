import { defineTool } from '@usemcpkit/core';

export const usersListAttestations = defineTool({
  name: 'users:list_attestations',
  description:
    'List attestations. List a collection of artifact attestations with a given subject digest that are associated with repositories owned by a user.',
  input: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        description: 'The handle for the GitHub user account.',
      },
      subject_digest: {
        type: 'string',
        description: 'Subject Digest',
      },
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      before: {
        type: 'string',
        description:
          'A cursor, as given in the Link header. If specified, the query only searches for results before this cursor. For more information, see "Using pagination in the REST API."',
      },
      after: {
        type: 'string',
        description:
          'A cursor, as given in the Link header. If specified, the query only searches for results after this cursor. For more information, see "Using pagination in the REST API."',
      },
      predicate_type: {
        type: 'string',
        description:
          'Optional filter for fetching attestations with a given predicate type. This option accepts `provenance`, `sbom`, `release`, or freeform text for custom predicate types.',
      },
    },
    required: ['username', 'subject_digest'],
  },
  request: {
    method: 'GET',
    path: '/users/{username}/attestations/{subject_digest}',
    query: ['per_page', 'before', 'after', 'predicate_type'],
  },
});
