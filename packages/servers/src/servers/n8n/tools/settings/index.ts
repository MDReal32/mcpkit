import { settingsLdapTools } from "./ldap";
import { settingsLogStreamingTools } from "./log-streaming";
import { settingsNodeTypePoliciesTools } from "./node-type-policies";
import { settingsOidcTools } from "./oidc";
import { settingsOtelTools } from "./otel";
import { settingsSamlTools } from "./saml";
import { settingsSecurityPolicyTools } from "./security-policy";

export const settingsGroupTools = [
  ...settingsLdapTools,
  ...settingsLogStreamingTools,
  ...settingsNodeTypePoliciesTools,
  ...settingsOidcTools,
  ...settingsOtelTools,
  ...settingsSamlTools,
  ...settingsSecurityPolicyTools,
];
