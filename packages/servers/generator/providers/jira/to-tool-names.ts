import { toToolNames as toGroupedToolNames } from '../../utils/naming/to-tool-names.ts';
import { toKebabCase } from './to-kebab-case.ts';

export const toToolNames = (group: string, category: string, operationId: string) =>
  toGroupedToolNames(group, toKebabCase(category), toKebabCase(operationId));
