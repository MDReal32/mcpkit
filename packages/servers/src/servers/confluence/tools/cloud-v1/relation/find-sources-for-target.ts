import { defineTool } from '@usemcpkit/core';

export const cloudV1RelationFindSourcesForTarget = defineTool({
  name: 'cloud_v1:relation:find_sources_for_target',
  description:
    '[Cloud v1] Find source entities related to a target entity. Returns all target entities that have a particular relationship to the source entity. Note, relationships are one way.',
  input: {
    type: 'object',
    properties: {
      relationName: {
        type: 'string',
        description:
          "The name of the relationship. This method supports relationships created via Create relationship. Note, this method does not support 'like' or 'favourite' relationships.",
      },
      sourceType: {
        type: 'string',
        enum: ['user', 'content', 'space'],
        description: 'The source entity type of the relationship.',
      },
      targetType: {
        type: 'string',
        enum: ['user', 'content', 'space'],
        description: 'The target entity type of the relationship.',
      },
      targetKey: {
        type: 'string',
        description: 'The identifier for the target entity:',
      },
      sourceStatus: {
        type: 'string',
        description: "The status of the source. This parameter is only used when the `sourceType` is 'content'.",
      },
      targetStatus: {
        type: 'string',
        description: "The status of the target. This parameter is only used when the `targetType` is 'content'.",
      },
      sourceVersion: {
        type: 'integer',
        description:
          "The version of the source. This parameter is only used when the `sourceType` is 'content' and the `sourceStatus` is 'historical'.",
      },
      targetVersion: {
        type: 'integer',
        description:
          "The version of the target. This parameter is only used when the `targetType` is 'content' and the `targetStatus` is 'historical'.",
      },
      expand: {
        type: 'string',
        description:
          'A multi-value parameter indicating which properties of the response object to expand. (comma-separated)',
      },
      start: {
        type: 'integer',
        description: 'The starting index of the returned relationships.',
      },
      limit: {
        type: 'integer',
        description:
          'The maximum number of relationships to return per page. Note, this may be restricted by fixed system limits.',
      },
    },
    required: ['relationName', 'sourceType', 'targetType', 'targetKey'],
  },
  request: {
    method: 'GET',
    path: '/wiki/rest/api/relation/{relationName}/to/{targetType}/{targetKey}/from/{sourceType}',
    query: ['sourceStatus', 'targetStatus', 'sourceVersion', 'targetVersion', 'expand', 'start', 'limit'],
  },
});
