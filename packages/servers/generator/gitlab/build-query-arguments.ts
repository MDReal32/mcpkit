import { toArgumentName } from './to-argument-name.ts';
import type { OpenApiParameter } from './types/open-api-operation.ts';

export interface QueryArgument {
  parameter: OpenApiParameter;
  argName: string;
}

export const buildQueryArguments = (parameters: OpenApiParameter[], takenNames: ReadonlySet<string>) => {
  const usedNames = new Set(takenNames);
  return parameters.map((parameter) => {
    const base = toArgumentName(parameter.name);
    const argName = usedNames.has(base) ? `${base}_${usedNames.size}` : base;
    usedNames.add(argName);
    const argument: QueryArgument = { parameter, argName };
    return argument;
  });
};
