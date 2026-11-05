import { defineTool } from "@usemcpkit/core";

export const credentialsCredentialsGetCredential = defineTool({
  name: "credentials:credentials:get_credential",
  description: "Get credential by ID. Retrieves a credential by ID. Credential data (secrets) is not included.",
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
    method: "GET",
    path: "/credentials/{credentialId}",
  },
});
