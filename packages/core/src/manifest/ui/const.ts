import type { UiTexts } from '../types/ui/ui-texts';

export const DEFAULT_UI_TEXTS: Readonly<UiTexts> = {
  brand: 'mcpkit',
  pageTitle: 'mcpkit · Connect',
  title: 'Connect {server}',
  intro:
    'A tool call needs access to {server}. What you enter is saved in ~/.mcpkit/secrets.json and used for later calls.',
  domainLabel: 'Domain',
  domainHint: 'Host, optionally with a port and path, without https://',
  domainPlaceholder: 'api.example.com',
  signInLabel: 'Sign in with OAuth2',
  tokenDivider: 'or use an access token',
  credentialLegend: 'Credential',
  fieldHint: 'Or set the {key} environment variable.',
  tokenLabel: 'Access token',
  usernameLabel: 'Username',
  passwordLabel: 'Password',
  headerLabel: '{name} header',
  queryLabel: '{name} query parameter',
  actionsDivider: 'or get a token',
  cancel: 'Cancel',
  submit: 'Save and continue',
  requiredField: '{label} is required',
  savedTitle: '{server} is connected',
  savedBody:
    'The credentials are saved in ~/.mcpkit/secrets.json. This tab closes by itself in a few seconds; you can also close it and go back to your MCP client.',
  signingInTitle: 'Continue in the new tab',
  signingInBody: 'Approve access to {server} in the sign-in tab that just opened. You can close this one.',
  cancelledTitle: 'Cancelled',
  cancelledBody:
    'Nothing was saved. The tool call that asked for credentials fails; calling it again reopens this form.',
  failedTitle: 'Something went wrong',
  requestFailed: 'the CLI answered {status}',
};

export const UI_TEXT_KEYS = Object.keys(DEFAULT_UI_TEXTS) as readonly (keyof UiTexts)[];

/** A program found on PATH by name; never a path, so a manifest cannot point at a file it ships. */
export const CLI_COMMAND_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

export const UI_ACTION_TYPES: readonly string[] = ['link', 'cli'];

export const UI_URL_PLACEHOLDERS: readonly string[] = ['domain', 'webHost', 'server'];

export const UI_DOMAIN_PLACEHOLDERS: readonly string[] = ['domain', 'webHost'];

export const UI_PLACEHOLDER_PATTERN = /\{(\w+)\}/g;

export const UI_INPUT_KEYS: readonly string[] = ['label', 'hint', 'placeholder'];

export const UI_AUTH_TYPES: readonly string[] = ['bearer', 'header', 'query', 'basic'];

export const UI_SERVER_KEYS: readonly string[] = ['texts'];

export const UI_AUTH_KEYS: readonly string[] = ['inputs', 'actions'];
