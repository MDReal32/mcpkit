import { defineTool } from "@usemcpkit/core";

export const credentialsTypePoliciesGetCredentialTypeInstancePolicy = defineTool({
  name: "credentials:type_policies:get_credential_type_instance_policy",
  description:
    "Preview: Retrieve the instance credential type policy. **Preview** — breaking changes may still occur without major version bump.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/credential-type-policies/instance",
  },
});
