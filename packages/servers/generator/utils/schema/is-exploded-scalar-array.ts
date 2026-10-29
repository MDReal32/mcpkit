import type { OpenApiParameter } from "../types/open-api-operation";
import { pickType } from "./pick-type";

const SCALAR_TYPES = ["string", "number", "integer", "boolean"];

export const isExplodedScalarArray = ({ explode, schema }: OpenApiParameter) =>
  schema?.type === "array" && explode !== false && SCALAR_TYPES.includes(pickType(schema.items ?? {}) ?? "");
