import { defineTool } from "@usemcpkit/core";

export const credentialsTypePoliciesListCredentialTypePolicyDocuments = defineTool({
  name: "credentials:type_policies:list_credential_type_policy_documents",
  description:
    "Preview: List credential type policy documents. **Preview** — breaking changes may still occur without major version bump.",
  input: {
    type: "object",
    properties: {
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
  },
  request: {
    method: "GET",
    path: "/credential-type-policies/policies",
    query: ["limit", "cursor"],
  },
});
