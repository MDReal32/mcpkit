import { defineTool } from "@usemcpkit/core";

export const orgsOrgsReviewPatGrantRequestsInBulk = defineTool({
  name: "orgs:orgs:review_pat_grant_requests_in_bulk",
  description:
    "Review requests to access organization resources with fine-grained personal access tokens. Approves or denies multiple pending requests to access organization resources via a fine-grained personal access token.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      pat_request_ids: {
        type: "array",
        description:
          "Unique identifiers of the requests for access via fine-grained personal access token. Must be formed of between 1 and 100 `pat_request_id` values.",
        items: {
          type: "integer",
        },
      },
      action: {
        type: "string",
        description: "Action to apply to the requests.",
        enum: ["approve", "deny"],
      },
      reason: {
        type: "string",
        description: "Reason for approving or denying the requests. Max 1024 characters.",
      },
    },
    required: ["org", "action"],
  },
  request: {
    method: "POST",
    path: "/orgs/{org}/personal-access-token-requests",
    body: ["pat_request_ids", "action", "reason"],
  },
});
