import { defineTool } from "@usemcpkit/core";

export const orgsOrgsDelete = defineTool({
  name: "orgs:orgs:delete",
  description: "Delete an organization. Deletes an organization and all its repositories.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
    },
    required: ["org"],
  },
  request: {
    method: "DELETE",
    path: "/orgs/{org}",
  },
});
