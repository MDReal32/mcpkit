import { toToolNames as toGroupedToolNames } from '../../utils/naming/to-tool-names';

export const toToolNames = (group: string, operationId: string) => {
  const separator = operationId.indexOf('/');
  return toGroupedToolNames(group, operationId.slice(0, separator), operationId.slice(separator + 1));
};
