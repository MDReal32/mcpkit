import { defineTool } from '@usemcpkit/core';

export const cloudV1RelationCreateRelationship = defineTool({
  name: 'cloud_v1:relation:create_relationship',
  description:
    "[Cloud v1] Create relationship. Creates a relationship between two entities (user, space, content). The 'favourite' relationship is supported by default, but you can use this method to create any type of relationship between two entities.",
  input: {
    type: 'object',
    properties: {
      relationName: {
        type: 'string',
        description:
          "The name of the relationship. This method supports the 'favourite' (i.e. 'save for later') relationship. You can also specify any other value for this parameter to create a custom relationship type.",
      },
      sourceType: {
        type: 'string',
        enum: ['user', 'content', 'space'],
        description:
          "The source entity type of the relationship. This must be 'user', if the `relationName` is 'favourite'.",
      },
      sourceKey: {
        type: 'string',
        description: '- The identifier for the source entity:',
      },
      targetType: {
        type: 'string',
        enum: ['user', 'content', 'space'],
        description:
          "The target entity type of the relationship. This must be 'space' or 'content', if the `relationName` is 'favourite'.",
      },
      targetKey: {
        type: 'string',
        description: '- The identifier for the target entity:',
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
    },
    required: ['relationName', 'sourceType', 'sourceKey', 'targetType', 'targetKey'],
  },
  request: {
    method: 'PUT',
    path: '/wiki/rest/api/relation/{relationName}/from/{sourceType}/{sourceKey}/to/{targetType}/{targetKey}',
    query: ['sourceStatus', 'targetStatus', 'sourceVersion', 'targetVersion'],
  },
});
