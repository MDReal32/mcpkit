import { defineTool } from "@usemcpkit/core";

export const actionsOidcUpdateOidcCustomSubTemplateForOrg = defineTool({
  name: "actions:oidc:update_oidc_custom_sub_template_for_org",
  description:
    "Set the customization template for an OIDC subject claim for an organization. Creates or updates the customization template for an OpenID Connect (OIDC) subject claim.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      include_claim_keys: {
        type: "array",
        description:
          "Array of unique strings. Each claim key can only contain alphanumeric characters and underscores.",
        items: {
          type: "string",
        },
      },
      use_immutable_subject: {
        type: "boolean",
        description:
          "Whether to opt in to the immutable OIDC subject claim format for the organization. When `true`, new OIDC tokens will use a stable, repository-ID-based `sub` claim instead of the name-based format.",
      },
    },
    required: ["org"],
  },
  request: {
    method: "PUT",
    path: "/orgs/{org}/actions/oidc/customization/sub",
    body: ["include_claim_keys", "use_immutable_subject"],
  },
});
