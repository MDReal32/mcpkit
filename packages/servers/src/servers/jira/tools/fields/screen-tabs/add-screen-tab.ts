import { defineTool } from "@usemcpkit/core";

export const fieldsScreenTabsAddScreenTab = defineTool({
  name: "fields:screen_tabs:add_screen_tab",
  description: "Create screen tab. Creates a tab for a screen.",
  input: {
    type: "object",
    properties: {
      screenId: {
        type: "integer",
        description: "The ID of the screen.",
      },
      id: {
        type: "integer",
        description: "The ID of the screen tab.",
      },
      name: {
        type: "string",
        description: "The name of the screen tab. The maximum length is 255 characters.",
      },
    },
    required: ["screenId", "name"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/screens/{screenId}/tabs",
    body: ["id", "name"],
  },
});
