import { defineTool } from "@usemcpkit/core";

export const settingsOidcGetOidcConfiguration = defineTool({
  name: "settings:oidc:get_oidc_configuration",
  description:
    "Retrieve the OIDC SSO configuration. Retrieve the current OIDC SSO configuration, including every field exposed in the UI. The client secret is redacted on read and is never echoed back in plaintext. Requires the `oidc:manage` scope and the OIDC feature to be licensed.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/settings/sso/oidc",
  },
});
