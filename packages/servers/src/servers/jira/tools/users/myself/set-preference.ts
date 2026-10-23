import { defineTool } from "@usemcpkit/core";

export const usersMyselfSetPreference = defineTool({
  name: "users:myself:set_preference",
  description:
    "Set preference. Creates a preference for the user or updates a preference's value by sending a plain text string. For example, `false`. An arbitrary preference can be created with the value containing up to 255 characters. In addition, the following keys define system preferences that can be set or created:",
  input: {
    type: "object",
    properties: {
      key: {
        type: "string",
        description: "The key of the preference. The maximum length is 255 characters.",
      },
      body: {
        type: "string",
      },
    },
    required: ["key", "body"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/mypreferences",
    query: ["key"],
    bodyArg: "body",
  },
});
