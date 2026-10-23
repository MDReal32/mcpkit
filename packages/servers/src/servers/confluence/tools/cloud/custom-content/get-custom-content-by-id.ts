import { defineTool } from "@usemcpkit/core";

export const cloudCustomContentGetCustomContentById = defineTool({
  name: "cloud:custom_content:get_custom_content_by_id",
  description: "[Cloud] Get custom content by id. Returns a specific piece of custom content.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description:
          "The ID of the custom content to be returned. If you don't know the custom content ID, use Get Custom Content by Type and filter the results.",
      },
      body_format: {
        type: "string",
        description:
          "The content format types to be returned in the `body` field of the response. If available, the representation will be available under a response field of the same name under the `body` field.",
        enum: ["raw", "storage", "atlas_doc_format", "view", "export_view", "anonymous_export_view"],
      },
      version: {
        type: "integer",
        description:
          "Allows you to retrieve a previously published version. Specify the previous version's number to retrieve its details.",
      },
      include_labels: {
        type: "boolean",
        description:
          "Includes labels associated with this custom content in the response. The number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results are available and a link to retrieve the rest of the results.",
      },
      include_properties: {
        type: "boolean",
        description:
          "Includes content properties associated with this custom content in the response. The number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results are available and a link to retrieve the rest of the results.",
      },
      include_operations: {
        type: "boolean",
        description:
          "Includes operations associated with this custom content in the response, as defined in the `Operation` object. The number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results are available and a link to retrieve the rest of the results.",
      },
      include_versions: {
        type: "boolean",
        description:
          "Includes versions associated with this custom content in the response. The number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results are available and a link to retrieve the rest of the results.",
      },
      include_version: {
        type: "boolean",
        description:
          "Includes the current version associated with this custom content in the response. By default this is included and can be omitted by setting the value to `false`.",
      },
      include_collaborators: {
        type: "boolean",
        description: "Includes collaborators on the custom content.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/custom-content/{id}",
    query: {
      "body-format": "body_format",
      version: "version",
      "include-labels": "include_labels",
      "include-properties": "include_properties",
      "include-operations": "include_operations",
      "include-versions": "include_versions",
      "include-version": "include_version",
      "include-collaborators": "include_collaborators",
    },
  },
});
