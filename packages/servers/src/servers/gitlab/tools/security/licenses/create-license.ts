import { defineTool } from "@usemcpkit/core";

export const securityLicensesCreateLicense = defineTool({
  name: "security:licenses:create_license",
  description: "Create a license. Creates a license.",
  input: {
    type: "object",
    properties: {
      license: {
        type: "string",
        description: "License string.",
      },
    },
    required: ["license"],
  },
  request: {
    method: "POST",
    path: "/license",
    body: ["license"],
  },
});
