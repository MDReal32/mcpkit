import type { ResponseSpec } from "../manifest";
import { toNameMapping } from "../manifest";
import { getPath } from "./get-path";
import { pickFields } from "./pick-fields";

export const mapResponse = (data: unknown, response: ResponseSpec = {}) => {
  const root = response.root ? getPath(data, response.root) : data;
  if (!response.fields) {
    return root;
  }
  const fieldMapping = toNameMapping(response.fields);
  return Array.isArray(root) ? root.map((item) => pickFields(item, fieldMapping)) : pickFields(root, fieldMapping);
};
