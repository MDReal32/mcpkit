import { defineTool } from "@usemcpkit/core";

export const fieldsIssueFieldConfigurationsGetAllFieldConfigurations = defineTool({
  name: "fields:issue_field_configurations:get_all_field_configurations",
  description:
    "[Deprecated] Get all field configurations. Deprecated, use Field schemes which supports field association schemes.",
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
          "The list of field configuration IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`. (comma-separated)",
      },
      isDefault: {
        type: "boolean",
        default: false,
        description: "If *true* returns default field configurations only.",
      },
      query: {
        type: "string",
        default: "",
        description: "The query string used to match against field configuration names and descriptions.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/fieldconfiguration",
    query: ["startAt", "maxResults", "id", "isDefault", "query"],
  },
});
