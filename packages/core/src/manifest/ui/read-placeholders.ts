import { UI_PLACEHOLDER_PATTERN } from "./const";

export const readPlaceholders = (template: string) =>
  Array.from(template.matchAll(UI_PLACEHOLDER_PATTERN), (match) => match[1] ?? "");
