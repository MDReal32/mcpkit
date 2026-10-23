import { defineTool } from "@usemcpkit/core";

export const datacenterWebhooksUpdate = defineTool({
  name: "datacenter:webhooks:update",
  description:
    "[Data Center]  Update webhook. Update an existing webhook. The authenticated user must be an administrator to call this resource.",
  input: {
    type: "object",
    properties: {
      webhookId: {
        type: "integer",
        description: "the existing webhook id",
      },
      name: {
        type: "string",
      },
      configuration: {
        type: "object",
      },
      url: {
        type: "string",
      },
      credentials: {
        type: "object",
        properties: {
          password: {
            type: "string",
          },
          username: {
            type: "string",
          },
        },
      },
      statistics: {
        type: "object",
      },
      scopeType: {
        type: "string",
      },
      events: {
        type: "array",
        items: {
          type: "string",
        },
      },
      active: {
        type: "boolean",
      },
      sslVerificationRequired: {
        type: "boolean",
      },
    },
    required: ["webhookId"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/webhooks/{webhookId}",
    body: [
      "name",
      "configuration",
      "url",
      "credentials",
      "statistics",
      "scopeType",
      "events",
      "active",
      "sslVerificationRequired",
    ],
  },
});
