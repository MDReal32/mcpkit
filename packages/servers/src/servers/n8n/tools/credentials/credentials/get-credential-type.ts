import { defineTool } from "@usemcpkit/core";

export const credentialsCredentialsGetCredentialType = defineTool({
  name: "credentials:credentials:get_credential_type",
  description: "Show credential data schema",
  input: {
    type: "object",
    properties: {
      credentialTypeName: {
        type: "string",
        description: "The credential type name that you want to get the schema for",
      },
    },
    required: ["credentialTypeName"],
  },
  request: {
    method: "GET",
    path: "/credentials/schema/{credentialTypeName}",
  },
});
