import type { ResponseSpec } from "@usemcpkit/core";
import { JSON_CONTENT_TYPE } from "../../utils/const";
import type { Operation } from "../../utils/types/operation";
import { RESPONSE_ROOT } from "./const";

/** Trims a response to the fields its `data` declares, per item when `data` is an array. */
export const toResponseSpec = ({ spec }: Operation) => {
  const data = spec.responses?.["200"]?.content?.[JSON_CONTENT_TYPE]?.schema?.properties?.[RESPONSE_ROOT];
  const fields = Object.keys((data?.type === "array" ? data.items : data)?.properties ?? {});
  if (fields.length === 0) {
    return undefined;
  }
  const response: ResponseSpec = { root: RESPONSE_ROOT, fields };
  return response;
};
