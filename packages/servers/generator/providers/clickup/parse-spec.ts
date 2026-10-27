import { parse } from "yaml";
import { dereference } from "../../utils/spec/dereference";
import type { OpenApiDocument } from "../../utils/types/open-api-operation";

/** The v3 document is served as `.yaml` but holds JSON; YAML parsing reads both. */
export const parseSpec = (text: string) => dereference(parse(text)) as OpenApiDocument;
