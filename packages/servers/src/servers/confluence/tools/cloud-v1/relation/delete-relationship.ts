import { defineTool } from "@usemcpkit/core";

export const cloudV1RelationDeleteRelationship = defineTool({
  name: "cloud_v1:relation:delete_relationship",
  description: "[Cloud v1] Delete relationship. Deletes a relationship between two entities (user, space, content).",
  input: {
    type: "object",
    properties: {
      relationName: {
        type: "string",
        description: "The name of the relationship.",
      },
      sourceType: {
        type: "string",
        enum: ["user", "content", "space"],
        description:
          "The source entity type of the relationship. This must be 'user', if the `relationName` is 'favourite'.",
      },
      sourceKey: {
        type: "string",
        description: "- The identifier for the source entity:",
      },
      targetType: {
        type: "string",
        enum: ["user", "content", "space"],
        description:
          "The target entity type of the relationship. This must be 'space' or 'content', if the `relationName` is 'favourite'.",
      },
      targetKey: {
        type: "string",
        description: "- The identifier for the target entity:",
      },
      sourceStatus: {
        type: "string",
        description: "The status of the source. This parameter is only used when the `sourceType` is 'content'.",
      },
      targetStatus: {
        type: "string",
        description: "The status of the target. This parameter is only used when the `targetType` is 'content'.",
      },
      sourceVersion: {
        type: "integer",
        description:
          "The version of the source. This parameter is only used when the `sourceType` is 'content' and the `sourceStatus` is 'historical'.",
      },
      targetVersion: {
        type: "integer",
        description:
          "The version of the target. This parameter is only used when the `targetType` is 'content' and the `targetStatus` is 'historical'.",
      },
    },
    required: ["relationName", "sourceType", "sourceKey", "targetType", "targetKey"],
  },
  request: {
    method: "DELETE",
    path: "/wiki/rest/api/relation/{relationName}/from/{sourceType}/{sourceKey}/to/{targetType}/{targetKey}",
    query: ["sourceStatus", "targetStatus", "sourceVersion", "targetVersion"],
  },
});
