import type { OpenApiDocument } from "../types/open-api-operation";
import { dereference } from "./dereference";

export const parseDereferencedJsonSpec = (text: string) => dereference(JSON.parse(text)) as OpenApiDocument;
