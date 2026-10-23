import { defineTool } from "@usemcpkit/core";

export const softwareSprintSetProperty = defineTool({
  name: "software:sprint:set_property",
  description: "Set property. Sets the value of the specified sprint's property.",
  input: {
    type: "object",
    properties: {
      sprintId: {
        type: "string",
        description: "the ID of the sprint on which the property will be set.",
      },
      propertyKey: {
        type: "string",
        description: "the key of the sprint's property. The maximum length of the key is 255 bytes.",
      },
      body: {},
    },
    required: ["sprintId", "propertyKey", "body"],
  },
  request: {
    method: "PUT",
    path: "/rest/agile/1.0/sprint/{sprintId}/properties/{propertyKey}",
    bodyArg: "body",
  },
});
