import { defineTool } from "@usemcpkit/core";

export const credentialsCredentialsGetCredentialDependencies = defineTool({
  name: "credentials:credentials:get_credential_dependencies",
  description: "List credential dependencies. List the workflows and agents that use the credential.",
  input: {
    type: "object",
    properties: {
      credentialId: {
        type: "string",
        description: "The ID of the credential.",
      },
      limit: {
        type: "number",
        default: 100,
        description: "The maximum number of items to return.",
      },
      cursor: {
        type: "string",
        description:
          'Paginate by setting the cursor parameter to the nextCursor attribute returned by the previous request\'s response. Default value fetches the first "page" of the collection. See pagination for more detail.',
      },
    },
    required: ["credentialId"],
  },
  request: {
    method: "GET",
    path: "/credentials/{credentialId}/dependencies",
    query: ["limit", "cursor"],
  },
});
