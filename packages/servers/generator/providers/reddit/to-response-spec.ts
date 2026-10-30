import type { ResponseSpec } from "@usemcpkit/core";
import { JSON_CONTENT_TYPE } from "../../utils/const";
import type { Operation } from "../../utils/types/operation";
import { LISTING_ROOT, THING_DATA } from "./const";
import { readDataFields } from "./read-data-fields";

/**
 * Trims a response to the fields its 200 schema declares: the things of a listing, a single thing's `data`, or the
 * top-level properties of a plain object. An array or a schema without properties is returned whole.
 */
export const toResponseSpec = ({ spec }: Operation) => {
  const schema = spec.responses?.["200"]?.content?.[JSON_CONTENT_TYPE]?.schema;
  const listingItem = schema?.properties?.[THING_DATA]?.properties?.children?.items;
  const listingFields = readDataFields(listingItem);
  if (listingFields) {
    const listing: ResponseSpec = { root: LISTING_ROOT, fields: listingFields };
    return listing;
  }
  const thingFields = readDataFields(schema);
  if (thingFields) {
    const thing: ResponseSpec = { fields: thingFields };
    return thing;
  }
  const properties = Object.keys(schema?.properties ?? {});
  if (properties.length === 0) {
    return undefined;
  }
  const object: ResponseSpec = { fields: properties };
  return object;
};
