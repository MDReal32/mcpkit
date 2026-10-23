import { defineTool } from "@usemcpkit/core";

export const softwareSprintGetPropertiesKeys = defineTool({
  name: "software:sprint:get_properties_keys",
  description:
    "Get properties keys. Returns the keys of all properties for the sprint identified by the id. The user who retrieves the property keys is required to have permissions to view the sprint.",
  input: {
    type: "object",
    properties: {
      sprintId: {
        type: "string",
        description: "the ID of the sprint from which property keys will be returned.",
      },
    },
    required: ["sprintId"],
  },
  request: {
    method: "GET",
    path: "/rest/agile/1.0/sprint/{sprintId}/properties",
  },
});
