import { defineTool } from "@usemcpkit/core";

export const fieldsIssueFieldConfigurationsGetAllFieldConfigurationSchemes = defineTool({
  name: "fields:issue_field_configurations:get_all_field_configuration_schemes",
  description:
    "[Deprecated] Get all field configuration schemes. Deprecated, use Field schemes which supports field association schemes.",
  input: {
    type: "object",
    properties: {
      startAt: {
        type: "integer",
        default: 0,
        description: "The index of the first item to return in a page of results (page offset).",
      },
      maxResults: {
        type: "integer",
        default: 50,
        description: "The maximum number of items to return per page.",
      },
      id: {
        type: "string",
        description:
          "The list of field configuration scheme IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`. (comma-separated)",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/fieldconfigurationscheme",
    query: ["startAt", "maxResults", "id"],
  },
});
