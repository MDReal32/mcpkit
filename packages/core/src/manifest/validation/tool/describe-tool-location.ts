import { isJsonObject } from '../../../json';

export const describeToolLocation = (tool: unknown, index: number) => {
  const name = isJsonObject(tool) && typeof tool.name === 'string' ? ` (${tool.name})` : '';
  return `tools[${index}]${name}`;
};
