import { defineTool } from "@usemcpkit/core";

export const datacenterContentUpdateRestriction = defineTool({
  name: "datacenter:content:update_restriction",
  description:
    "[Data Center] Update restrictions. Sets all the restrictions specified to a piece of content identified by `contentId`. Setting per-content restrictions is currently allowed for Pages or BlogPosts only.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
      expand: {
        type: "string",
        description:
          "A comma separated list of properties to expand in the response. Default is <code>restrictions.user, restrictions.group</code> Default value: group.",
      },
      limit: {
        type: "string",
        description: "pagination limit.",
      },
      start: {
        type: "string",
        description: "pagination start.",
      },
      body: {
        type: "array",
        items: {
          type: "object",
          properties: {
            content: {
              type: "object",
            },
            operation: {
              type: "string",
            },
            restrictions: {
              type: "object",
            },
            lastModificationDate: {
              type: "string",
            },
          },
        },
      },
    },
    required: ["id"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/content/{id}/restriction",
    query: ["expand", "limit", "start"],
    bodyArg: "body",
  },
});
