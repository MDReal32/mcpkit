import { defineTool } from "@usemcpkit/core";

export const orgsOrgsDeleteWebhook = defineTool({
  name: "orgs:orgs:delete_webhook",
  description: "Delete an organization webhook. Delete a webhook for an organization.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      hook_id: {
        type: "integer",
        description:
          "The unique identifier of the hook. You can find this value in the `X-GitHub-Hook-ID` header of a webhook delivery.",
      },
    },
    required: ["org", "hook_id"],
  },
  request: {
    method: "DELETE",
    path: "/orgs/{org}/hooks/{hook_id}",
  },
});
