import { defineTool } from '@usemcpkit/core';

export const orgsOrgsListAttestationRepositories = defineTool({
  name: 'orgs:orgs:list_attestation_repositories',
  description:
    'List attestation repositories. List repositories owned by the provided organization that have created at least one attested artifact Results will be sorted in ascending order by repository ID',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
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
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/attestations/repositories',
    query: ['per_page', 'before', 'after', 'predicate_type'],
  },
});
