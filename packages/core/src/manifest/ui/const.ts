import type { UiTexts } from "../types/ui/ui-texts";

export const DEFAULT_UI_TEXTS: Readonly<UiTexts> = {
  brand: "usemcpkit",
  pageTitle: "usemcpkit · Connect",
  title: "Connect {server}",
  intro:
    "A tool call needs access to {server}. What you enter is saved in ~/.usemcpkit/config.json and used for later calls.",
  domainLabel: "Domain",
  domainHint: "Host, optionally with a port and path, without https://",
  domainPlaceholder: "api.example.com",
  domainNewHost: "New host, saved with its own credentials.",
  domainShowHosts: "Show saved hosts",
  domainCheck: "Check",
  domainChecking: "Checking…",
  domainChecked: "{source} {version}",
  signInLabel: "Sign in with OAuth2",
  tokenDivider: "or use an access token",
  credentialLegend: "Credential",
  fieldHint: "Or set the {key} environment variable.",
  tokenLabel: "Access token",
  usernameLabel: "Username",
  passwordLabel: "Password",
  headerLabel: "{name} header",
  queryLabel: "{name} query parameter",
  actionsDivider: "or get a token",
  cancel: "Cancel",
  submit: "Save and continue",
  checking: "Checking with {server}…",
  requiredField: "{label} is required",
  savedTitle: "{server} is connected",
  savedBody:
    "The credentials are saved in ~/.usemcpkit/config.json. This window closes by itself in a few seconds; you can also close it and go back to your MCP client.",
  signingInTitle: "Continue in the new tab",
  signingInBody: "Approve access to {server} in the sign-in tab that just opened. You can close this one.",
  cancelledTitle: "Cancelled",
  cancelledBody:
    "Nothing was saved. The tool call that asked for credentials fails; calling it again reopens this form.",
  failedTitle: "Something went wrong",
  requestFailed: "the CLI answered {status}",
};

export const UI_DOMAIN_PLACEHOLDERS: readonly string[] = ["domain", "webHost"];

export const UI_PLACEHOLDER_PATTERN = /\{(\w+)\}/g;
