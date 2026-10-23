import { isJsonObject } from '../../../json';
import { describeToolLocation } from './describe-tool-location';
import { validateRequest } from './validate-request';
import { validateToolEditions } from './validate-tool-editions';
import { validateToolFields } from './validate-tool-fields';

export const validateTool = (tool: unknown, index: number, editionNames: ReadonlySet<string>) => {
  const location = describeToolLocation(tool, index);
  if (!isJsonObject(tool)) {
    return [`${location} must be an object`];
  }
  const fieldErrors = validateToolFields(tool, location);
  const input = tool.input;
  if (!isJsonObject(input) || input.type !== 'object') {
    return [...fieldErrors, `${location}.input must be a JSON Schema with type "object"`];
  }
  const declaredArgs = new Set(isJsonObject(input.properties) ? Object.keys(input.properties) : []);
  return [
    ...fieldErrors,
    ...validateRequest(tool.request, declaredArgs, location),
    ...validateToolEditions(tool, declaredArgs, editionNames, location),
  ];
};
