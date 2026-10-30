import type { OpenApiSchema } from "../../utils/types/open-api-schema";
import { THING_DATA } from "./const";

/** Maps each field a thing declares under `data` to its path, `{ title: "data.title" }`; none when it is not a thing. */
export const readDataFields = (thing: OpenApiSchema | undefined) => {
  const fields = Object.keys(thing?.properties?.[THING_DATA]?.properties ?? {});
  if (fields.length === 0) {
    return undefined;
  }
  return Object.fromEntries(fields.map((field) => [field, `${THING_DATA}.${field}`]));
};
