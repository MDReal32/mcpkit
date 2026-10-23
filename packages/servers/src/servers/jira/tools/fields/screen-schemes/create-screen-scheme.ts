import { defineTool } from "@usemcpkit/core";

export const fieldsScreenSchemesCreateScreenScheme = defineTool({
  name: "fields:screen_schemes:create_screen_scheme",
  description: "Create screen scheme. Creates a screen scheme.",
  input: {
    type: "object",
    properties: {
      description: {
        type: "string",
        description: "The description of the screen scheme. The maximum length is 255 characters.",
      },
      name: {
        type: "string",
        description: "The name of the screen scheme. The name must be unique. The maximum length is 255 characters.",
      },
      screens: {
        type: "object",
        description:
          "The IDs of the screens for the screen types of the screen scheme. Only screens used in classic projects are accepted.",
        properties: {
          create: {
            type: "integer",
            description: "The ID of the create screen.",
          },
          default: {
            type: "integer",
            description: "The ID of the default screen. Required when creating a screen scheme.",
          },
          edit: {
            type: "integer",
            description: "The ID of the edit screen.",
          },
          view: {
            type: "integer",
            description: "The ID of the view screen.",
          },
        },
        required: ["default"],
      },
    },
    required: ["name", "screens"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/screenscheme",
    body: ["description", "name", "screens"],
  },
});
