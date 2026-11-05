import { defineTool } from "@usemcpkit/core";

export const settingsOidcSetOidcConfiguration = defineTool({
  name: "settings:oidc:set_oidc_configuration",
  description:
    "Set the OIDC SSO configuration. Set the OIDC SSO configuration. The update takes effect exactly as it would from the UI, using the same validation. `clientId`, `clientSecret` and `discoveryEndpoint` are required; submit the redacted client secret sentinel to keep the stored secret unchanged. Requires the `oidc:manage` scope and the OIDC feature to be licensed. The client secret is redacted in the response. When the configuratio…",
  input: {
    type: "object",
    properties: {
      clientId: {
        type: "string",
        description: "The client ID issued when registering n8n with the OIDC provider.",
      },
      clientSecret: {
        type: "string",
        description:
          "The client secret issued when registering n8n with the OIDC provider. Submit the redacted sentinel value returned on read to keep the stored secret unchanged.",
      },
      discoveryEndpoint: {
        type: "string",
        description: "The OIDC provider's well-known discovery endpoint.",
      },
      loginEnabled: {
        type: "boolean",
        description: "Whether OIDC single sign-on is enabled.",
      },
      prompt: {
        type: "string",
        description: "The prompt parameter to use when authenticating.",
        enum: ["none", "login", "consent", "select_account", "create"],
      },
      authenticationContextClassReference: {
        type: "array",
        description:
          "ACR values to include in the authorization request (acr_values parameter), in order of preference. Use an empty array when unused.",
        items: {
          type: "string",
        },
      },
      additionalScopes: {
        type: "string",
        description:
          "Additional scopes to request, space separated. n8n always requests `openid`, `profile` and `email`. Use an empty string when unused.",
      },
      emailVerifiedRequired: {
        type: "boolean",
        description:
          "Whether the identity provider must assert that the user's email address is verified before the login is accepted. When disabled, only an explicit negative assertion is rejected.",
      },
      rpInitiatedLogoutEnabled: {
        type: "boolean",
        description:
          "Whether signing out of n8n also ends the session at the OIDC provider via RP-Initiated Logout. When disabled, sign-out is local to n8n only.",
      },
    },
    required: [
      "clientId",
      "clientSecret",
      "discoveryEndpoint",
      "loginEnabled",
      "prompt",
      "authenticationContextClassReference",
      "additionalScopes",
      "emailVerifiedRequired",
      "rpInitiatedLogoutEnabled",
    ],
  },
  request: {
    method: "PUT",
    path: "/settings/sso/oidc",
    body: [
      "clientId",
      "clientSecret",
      "discoveryEndpoint",
      "loginEnabled",
      "prompt",
      "authenticationContextClassReference",
      "additionalScopes",
      "emailVerifiedRequired",
      "rpInitiatedLogoutEnabled",
    ],
  },
});
