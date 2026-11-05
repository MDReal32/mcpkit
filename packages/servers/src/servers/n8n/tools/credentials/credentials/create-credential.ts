import { defineTool } from "@usemcpkit/core";

export const credentialsCredentialsCreateCredential = defineTool({
  name: "credentials:credentials:create_credential",
  description: "Create a credential. Creates a credential that can be used by nodes of the specified type.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description:
          "An unused credential ID of 1–16 letters, digits, underscores, or hyphens. The supplied ID is preserved exactly. Omit to generate an ID.",
      },
      name: {
        type: "string",
      },
      description: {
        type: "string",
        description:
          "Plain text, up to 512 characters. A blank value is saved as null. Ignored when credential descriptions are disabled.",
      },
      type: {
        type: "string",
      },
      data: {
        type: "object",
        description: 'The credential data. Fields also accept n8n expressions, which are strings that start with "=".',
      },
      isResolvable: {
        type: "boolean",
        description: "Whether this credential has resolvable fields",
      },
      createdAt: {
        type: "string",
      },
      updatedAt: {
        type: "string",
      },
      projectId: {
        type: "string",
        description: "Project to create the credential in. Defaults to the user's personal project.",
      },
    },
    required: ["name", "type", "data"],
  },
  request: {
    method: "POST",
    path: "/credentials",
    body: ["id", "name", "description", "type", "data", "isResolvable", "createdAt", "updatedAt", "projectId"],
  },
});
