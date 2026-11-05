import { defineTool } from "@usemcpkit/core";

export const credentialsCredentialsUpdateCredential = defineTool({
  name: "credentials:credentials:update_credential",
  description: "Update credential by ID. Updates an existing credential. You must be the owner of the credential.",
  input: {
    type: "object",
    properties: {
      credentialId: {
        type: "string",
        description: "The ID of the credential.",
      },
      name: {
        type: "string",
        description: "The name of the credential",
      },
      description: {
        type: "string",
        description:
          "Plain text, up to 512 characters. Send null or a blank value to clear it. Omit it to keep the stored value. Ignored when credential descriptions are disabled.",
      },
      type: {
        type: "string",
        description: "The credential type. If changing type, data must also be provided.",
      },
      data: {
        type: "object",
        description:
          'The credential data. Required when changing credential type. Fields also accept n8n expressions, which are strings that start with "=".',
      },
      isGlobal: {
        type: "boolean",
        description: "Whether this credential is available globally",
      },
      isResolvable: {
        type: "boolean",
        description: "Whether this credential has resolvable fields",
      },
      isPartialData: {
        type: "boolean",
        description:
          "If true, unredacts and merges existing credential data with the provided data. If false, replaces the entire data object.",
        default: false,
      },
    },
    required: ["credentialId"],
  },
  request: {
    method: "PATCH",
    path: "/credentials/{credentialId}",
    body: ["name", "description", "type", "data", "isGlobal", "isResolvable", "isPartialData"],
  },
});
