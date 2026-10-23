import { defineTool } from '@usemcpkit/core';

export const softwareBoardGetAllVersions = defineTool({
  name: 'software:board:get_all_versions',
  description:
    'Get all versions. Returns all versions from a board, for a given board ID. This only includes versions that the user has permission to view. Note, if the user does not have permission to view the board, no versions will be returned at all. Returned versions are ordered by the name of the project from which they belong and then by sequence defined by user.',
  input: {
    type: 'object',
    properties: {
      boardId: {
        type: 'integer',
        description: 'The ID of the board that contains the requested versions.',
      },
      startAt: {
        type: 'integer',
        description:
          "The starting index of the returned versions. Base index: 0. See the 'Pagination' section at the top of this page for more details.",
      },
      maxResults: {
        type: 'integer',
        description:
          "The maximum number of versions to return per page. See the 'Pagination' section at the top of this page for more details.",
      },
      released: {
        type: 'string',
        description: 'Filters results to versions that are either released or unreleased. Valid values: true, false.',
      },
    },
    required: ['boardId'],
  },
  request: {
    method: 'GET',
    path: '/rest/agile/1.0/board/{boardId}/version',
    query: ['startAt', 'maxResults', 'released'],
  },
});
