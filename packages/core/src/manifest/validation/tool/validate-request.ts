import { isJsonObject } from "../../../json";
import { HTTP_METHODS } from "../../const";
import { isHttpMethod } from "../guards/is-http-method";
import { validateArgSpec } from "./validate-arg-spec";
import { validateBodyArg } from "./validate-body-arg";
import { validateCommaQuery } from "./validate-comma-query";
import { validateContentType } from "./validate-content-type";
import { validateFileArgs } from "./validate-file-args";
import { validateFixedHeaders } from "./validate-fixed-headers";
import { validateFixedValues } from "./validate-fixed-values";
import { validateRequestPath } from "./validate-request-path";

export const validateRequest = (request: unknown, declaredArgs: ReadonlySet<string>, location: string) => {
  if (!isJsonObject(request)) {
    return [`${location}.request is required`];
  }
  const methodErrors = isHttpMethod(request.method)
    ? []
    : [`${location}.request.method must be one of: ${HTTP_METHODS.join(", ")}`];
  return [
    ...methodErrors,
    ...validateRequestPath(request.path, declaredArgs, location),
    ...validateArgSpec(request.query, declaredArgs, `${location}.request.query`),
    ...validateArgSpec(request.body, declaredArgs, `${location}.request.body`),
    ...validateFileArgs(request.fileArgs, declaredArgs, `${location}.request.fileArgs`),
    ...validateContentType(request, location),
    ...validateBodyArg(request, declaredArgs, location),
    ...validateFixedValues(request.fixedQuery, `${location}.request.fixedQuery`),
    ...validateCommaQuery(request.commaQuery, `${location}.request.commaQuery`),
    ...validateFixedHeaders(request.fixedHeaders, `${location}.request.fixedHeaders`),
    ...validateFixedValues(request.fixedBody, `${location}.request.fixedBody`),
  ];
};
