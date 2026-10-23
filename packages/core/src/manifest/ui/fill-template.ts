import { UI_PLACEHOLDER_PATTERN } from './const';

/** Replaces `{name}` with its value; a placeholder without a value stays as it is. */
export const fillTemplate = (template: string, values: Readonly<Record<string, string>>) =>
  template.replace(UI_PLACEHOLDER_PATTERN, (placeholder, name: string) => values[name] ?? placeholder);
