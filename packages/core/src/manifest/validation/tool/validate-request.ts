import { isJsonObject } from '../../../json';
import { HTTP_METHODS } from '../../const';
import { isHttpMethod } from '../guards/is-http-method';
import { validateArgSpec } from './validate-arg-spec';
import { validateFixedValues } from './validate-fixed-values';
import { validateRequestPath } from './validate-request-path';

export const validateRequest = (request: unknown, declaredArgs: ReadonlySet<string>, location: string) => {
  if (!isJsonObject(request)) {
    return [`${location}.request is required`];
  }
  const methodErrors = isHttpMethod(request.method)
    ? []
    : [`${location}.request.method must be one of: ${HTTP_METHODS.join(', ')}`];
  return [
    ...methodErrors,
    ...validateRequestPath(request.path, declaredArgs, location),
    ...validateArgSpec(request.query, declaredArgs, `${location}.request.query`),
    ...validateArgSpec(request.body, declaredArgs, `${location}.request.body`),
    ...validateFixedValues(request.fixedQuery, `${location}.request.fixedQuery`),
    ...validateFixedValues(request.fixedBody, `${location}.request.fixedBody`),
  ];
};
