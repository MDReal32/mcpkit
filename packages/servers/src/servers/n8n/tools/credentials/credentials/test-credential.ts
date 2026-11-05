import { defineTool } from "@usemcpkit/core";

export const credentialsCredentialsTestCredential = defineTool({
  name: "credentials:credentials:test_credential",
  description: "Test credential by ID. Tests a credential by ID using the stored credential data.",
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
    method: "POST",
    path: "/credentials/{credentialId}/test",
  },
});
