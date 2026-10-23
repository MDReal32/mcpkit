import { isJsonObject } from "../../../json";
import { validateRequest } from "./validate-request";

export const validateToolEditions = (
  tool: Readonly<Record<string, unknown>>,
  declaredArgs: ReadonlySet<string>,
  editionNames: ReadonlySet<string>,
  location: string,
) => {
  const { editions } = tool;
  if (editions === undefined) {
    return [];
  }
  if (!isJsonObject(editions)) {
    return [`${location}.editions must be an object`];
  }
  return Object.entries(editions).flatMap(([name, edition]) => {
    const editionLocation = `${location}.editions.${name}`;
    if (!editionNames.has(name)) {
      return [`${editionLocation}: "${name}" is not in the manifest's editions`];
    }
    if (!isJsonObject(edition)) {
      return [`${editionLocation} must be an object`];
    }
    const responseErrors =
      edition.response === undefined || isJsonObject(edition.response)
        ? []
        : [`${editionLocation}.response must be an object`];
    return [...validateRequest(edition.request, declaredArgs, editionLocation), ...responseErrors];
  });
};
