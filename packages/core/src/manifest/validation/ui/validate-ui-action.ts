import { isJsonObject } from '../../../json';
import { CLI_COMMAND_PATTERN, UI_ACTION_TYPES, UI_DOMAIN_PLACEHOLDERS, UI_URL_PLACEHOLDERS } from '../../ui/const';
import { readPlaceholders } from '../../ui/read-placeholders';
import { isHttpsUrl } from '../guards/is-https-url';
import { validateCliArgs } from './validate-cli-args';

const validateLinkUrl = (url: unknown, location: string, hasDomain: boolean) => {
  if (!isHttpsUrl(url)) {
    return [`${location}.url must be an https:// URL`];
  }
  const placeholders = readPlaceholders(url);
  const unknown = placeholders.filter((name) => !UI_URL_PLACEHOLDERS.includes(name));
  if (unknown.length > 0) {
    return [`${location}.url has unknown placeholders: ${unknown.map((name) => `{${name}}`).join(', ')}`];
  }
  if (!hasDomain && placeholders.some((name) => UI_DOMAIN_PLACEHOLDERS.includes(name))) {
    return [`${location}.url uses the domain, so the manifest needs a domain`];
  }
  return [];
};

export const validateUiAction = (action: unknown, location: string, hasDomain: boolean, allowsCli: boolean) => {
  if (!isJsonObject(action) || typeof action.type !== 'string' || !UI_ACTION_TYPES.includes(action.type)) {
    return [`${location}.type must be one of: ${UI_ACTION_TYPES.join(', ')}`];
  }
  const labelErrors =
    typeof action.label === 'string' && action.label.trim() ? [] : [`${location}.label must be a non-empty string`];
  if (action.type === 'link') {
    return [...labelErrors, ...validateLinkUrl(action.url, location, hasDomain)];
  }
  const commandErrors =
    typeof action.command === 'string' && CLI_COMMAND_PATTERN.test(action.command)
      ? []
      : [`${location}.command must be a program name found on PATH, without a path or arguments`];
  const authErrors = allowsCli
    ? []
    : [`${location}: a CLI prints one token, so it needs an auth entry with a single credential`];
  return [...labelErrors, ...commandErrors, ...validateCliArgs(action.args, location, hasDomain), ...authErrors];
};
