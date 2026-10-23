import { toToolNames as toGroupedToolNames } from '../../utils/naming/to-tool-names';
import { toKebabCase } from './to-kebab-case';

export const toToolNames = (group: string, category: string, operationId: string) =>
  toGroupedToolNames(group, toKebabCase(category), toKebabCase(operationId));
