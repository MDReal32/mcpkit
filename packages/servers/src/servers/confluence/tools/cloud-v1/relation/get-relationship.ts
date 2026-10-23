import { defineTool } from "@usemcpkit/core";

export const cloudV1RelationGetRelationship = defineTool({
  name: "cloud_v1:relation:get_relationship",
  description:
    "[Cloud v1] Find relationship from source to target. Find whether a particular type of relationship exists from a source entity to a target entity. Note, relationships are one way.",
  input: {
    type: "object",
    properties: {
      relationName: {
        type: "string",
        description:
          "The name of the relationship. This method supports the 'favourite' (i.e. 'save for later') relationship as well as any other relationship types created via Create relationship.",
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
        description: "The identifier for the target entity:",
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
      expand: {
        type: "string",
        description:
          "A multi-value parameter indicating which properties of the response object to expand. (comma-separated)",
      },
    },
    required: ["relationName", "sourceType", "sourceKey", "targetType", "targetKey"],
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/relation/{relationName}/from/{sourceType}/{sourceKey}/to/{targetType}/{targetKey}",
    query: ["sourceStatus", "targetStatus", "sourceVersion", "targetVersion", "expand"],
    commaQuery: ["expand"],
  },
});
