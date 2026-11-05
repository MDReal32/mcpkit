import { defineTool } from "@usemcpkit/core";

export const instanceAuditGenerateAudit = defineTool({
  name: "instance:audit:generate_audit",
  description: "Generate an audit. Generate a security audit for your n8n instance.",
  input: {
    type: "object",
    properties: {
      additionalOptions: {
        type: "object",
        properties: {
          daysAbandonedWorkflow: {
            type: "integer",
            description: "Days for a workflow to be considered abandoned if not executed",
          },
          categories: {
            type: "array",
            items: {
              type: "string",
              enum: ["credentials", "database", "nodes", "filesystem", "instance"],
            },
          },
        },
      },
    },
  },
  request: {
    method: "POST",
    path: "/audit",
    body: ["additionalOptions"],
  },
});
