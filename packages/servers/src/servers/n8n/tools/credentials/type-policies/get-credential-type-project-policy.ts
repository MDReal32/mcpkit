import { defineTool } from "@usemcpkit/core";

export const credentialsTypePoliciesGetCredentialTypeProjectPolicy = defineTool({
  name: "credentials:type_policies:get_credential_type_project_policy",
  description:
    "Preview: Retrieve a project's credential type policy. **Preview** — breaking changes may still occur without major version bump.",
  input: {
    type: "object",
    properties: {
      projectId: {
        type: "string",
        description: "The ID of the project.",
      },
    },
    required: ["projectId"],
  },
  request: {
    method: "GET",
    path: "/credential-type-policies/projects/{projectId}",
  },
});
