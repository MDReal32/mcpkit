import { defineTool } from "@usemcpkit/core";

export const credentialsCredentialsDeleteCredential = defineTool({
  name: "credentials:credentials:delete_credential",
  description:
    "Delete credential by ID. Deletes a credential from your instance. You must be the owner of the credential.",
  input: {
    type: "object",
    properties: {
      credentialId: {
        type: "string",
        description: "The ID of the credential.",
      },
    },
    required: ["credentialId"],
  },
  request: {
    method: "DELETE",
    path: "/credentials/{credentialId}",
  },
});
