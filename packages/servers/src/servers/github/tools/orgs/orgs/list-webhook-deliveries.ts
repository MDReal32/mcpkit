import { defineTool } from "@usemcpkit/core";

export const orgsOrgsListWebhookDeliveries = defineTool({
  name: "orgs:orgs:list_webhook_deliveries",
  description:
    "List deliveries for an organization webhook. Returns a list of webhook deliveries for a webhook configured in an organization.",
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
      per_page: {
        type: "integer",
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      cursor: {
        type: "string",
        description:
          "Used for pagination: the starting delivery from which the page of deliveries is fetched. Refer to the `link` header for the next and previous page cursors.",
      },
      status: {
        type: "string",
        enum: ["success", "failure"],
        description:
          "Returns webhook deliveries filtered by delivery outcome classification based on `status_code` range. A `status` of `success` returns deliveries with a `status_code` in the 200-399 range (inclusive). A `status` of `failure` returns deliveries with a `status_code` in the 400-599 range (inclusive).",
      },
    },
    required: ["org", "hook_id"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/hooks/{hook_id}/deliveries",
    query: ["per_page", "cursor", "status"],
  },
});
