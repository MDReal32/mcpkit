import { defineTool } from "@usemcpkit/core";

export const groupsGroupsGetGroups = defineTool({
  name: "groups:groups:get_groups",
  description: "Retrieve a group. Retrieves a specified group by ID or path.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      with_custom_attributes: {
        type: "boolean",
        default: false,
        description: "If `true`, includes custom attributes in the response. Administrators only.",
      },
      custom_attributes: {
        type: "object",
        description:
          "Filter by custom attributes that match all of the specified key and value pairs. Administrators only.",
      },
      with_projects: {
        type: "boolean",
        default: true,
        description:
          "If `true`, includes details of the projects that belong to the group. Deprecated and scheduled for removal in API v5. To list the projects in a group, use the List all projects in a group operation instead.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}",
    query: ["with_custom_attributes", "custom_attributes", "with_projects"],
  },
});
