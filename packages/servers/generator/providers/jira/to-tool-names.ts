import { toKebabCase } from "../../utils/naming/to-kebab-case";
import { toToolNames as toGroupedToolNames } from "../../utils/naming/to-tool-names";

export const toToolNames = (group: string, category: string, operationId: string) =>
  toGroupedToolNames(group, toKebabCase(category), toKebabCase(operationId));
