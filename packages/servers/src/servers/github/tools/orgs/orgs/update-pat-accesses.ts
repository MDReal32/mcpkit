import { defineTool } from "@usemcpkit/core";

export const orgsOrgsUpdatePatAccesses = defineTool({
  name: "orgs:orgs:update_pat_accesses",
  description:
    "Update the access to organization resources via fine-grained personal access tokens. Updates the access organization members have to organization resources via fine-grained personal access tokens. Limited to revoking a token's existing access.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      action: {
        type: "string",
        description: "Action to apply to the fine-grained personal access token.",
        enum: ["revoke"],
      },
      pat_ids: {
        type: "array",
        description: "The IDs of the fine-grained personal access tokens.",
        items: {
          type: "integer",
          description: "Unique identifier of the fine-grained personal access token.",
        },
      },
    },
    required: ["org", "action", "pat_ids"],
  },
  request: {
    method: "POST",
    path: "/orgs/{org}/personal-access-tokens",
    body: ["action", "pat_ids"],
  },
});
