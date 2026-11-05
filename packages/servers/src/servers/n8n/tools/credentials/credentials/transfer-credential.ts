import { defineTool } from "@usemcpkit/core";

export const credentialsCredentialsTransferCredential = defineTool({
  name: "credentials:credentials:transfer_credential",
  description: "Transfer a credential to another project. Transfer a credential to another project.",
  input: {
    type: "object",
    properties: {
      credentialId: {
        type: "string",
        description: "The ID of the credential.",
      },
      destinationProjectId: {
        type: "string",
        description: "The ID of the project to transfer the credential to.",
      },
    },
    required: ["credentialId", "destinationProjectId"],
  },
  request: {
    method: "PUT",
    path: "/credentials/{credentialId}/transfer",
    body: ["destinationProjectId"],
  },
});
