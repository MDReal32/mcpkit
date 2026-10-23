import { isJsonObject } from '../../../json';
import { SERVER_NAME_PATTERN } from '../../const';

export const validateToolFields = (tool: Readonly<Record<string, unknown>>, location: string) => {
  const errors: string[] = [];
  if (!SERVER_NAME_PATTERN.test(String(tool.name ?? ''))) {
    errors.push(`${location}.name must match ${SERVER_NAME_PATTERN}`);
  }
  if (typeof tool.description !== 'string') {
    errors.push(`${location}.description is required`);
  }
  if (tool.response !== undefined && !isJsonObject(tool.response)) {
    errors.push(`${location}.response must be an object`);
  }
  return errors;
};
