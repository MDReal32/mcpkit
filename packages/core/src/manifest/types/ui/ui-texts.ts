/**
 * Every string the credentials page shows. `{server}` is filled in by mcpkit; `{key}`, `{name}`, `{label}` and
 * `{status}` are filled in where the text is used.
 */
export interface UiTexts {
  brand: string;
  pageTitle: string;
  title: string;
  intro: string;
  domainLabel: string;
  domainHint: string;
  domainPlaceholder: string;
  domainNewHost: string;
  domainShowHosts: string;
  signInLabel: string;
  tokenDivider: string;
  credentialLegend: string;
  fieldHint: string;
  tokenLabel: string;
  usernameLabel: string;
  passwordLabel: string;
  headerLabel: string;
  queryLabel: string;
  actionsDivider: string;
  cancel: string;
  submit: string;
  requiredField: string;
  savedTitle: string;
  savedBody: string;
  signingInTitle: string;
  signingInBody: string;
  cancelledTitle: string;
  cancelledBody: string;
  failedTitle: string;
  requestFailed: string;
}
