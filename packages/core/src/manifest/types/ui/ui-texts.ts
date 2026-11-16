/**
 * Every string the credentials page shows. `{server}` is filled in by usemcpkit; `{key}`, `{name}`, `{label}`,
 * `{status}`, `{source}` and `{version}` are filled in where the text is used.
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
  domainCheck: string;
  domainChecking: string;
  domainChecked: string;
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
  checking: string;
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
