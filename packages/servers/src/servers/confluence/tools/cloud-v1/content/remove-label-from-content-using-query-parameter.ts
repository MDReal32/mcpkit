import { defineTool } from "@usemcpkit/core";

export const cloudV1ContentRemoveLabelFromContentUsingQueryParameter = defineTool({
  name: "cloud_v1:content:remove_label_from_content_using_query_parameter",
  description:
    "[Cloud v1] Remove label from content using query parameter. Removes a label from a piece of content. Labels can't be deleted from archived content. This is similar to Remove label from content except that the label name is specified via a query parameter.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the content that the label will be removed from.",
      },
      name: {
        type: "string",
        description: "The name of the label to be removed.",
      },
    },
    required: ["id", "name"],
  },
  request: {
    method: "DELETE",
    path: "/wiki/rest/api/content/{id}/label",
    query: ["name"],
  },
});
