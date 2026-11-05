import { defineTool } from "@usemcpkit/core";

export const settingsSamlGetSamlConfiguration = defineTool({
  name: "settings:saml:get_saml_configuration",
  description:
    "Retrieve the SAML SSO configuration. Retrieve the current SAML SSO configuration, including every field exposed in the UI plus the service provider entity ID and ACS return URL. Signing private keys, signing certificates, and identity provider metadata are redacted on read. Requires the `saml:manage` scope and the SAML feature to be licensed.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/settings/sso/saml",
  },
});
