import { dereference } from "../../utils/spec/dereference";
import type { OpenApiDocument } from "../../utils/types/open-api-operation";

export const parseSpec = (text: string) => dereference(JSON.parse(text)) as OpenApiDocument;
