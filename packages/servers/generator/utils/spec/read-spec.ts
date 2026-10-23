import type { OpenApiDocument } from "../types/open-api-operation";
import { loadSpecText } from "./load-spec-text";
import { parseJsonSpec } from "./parse-json-spec";

export type SpecParser = (text: string, localPath: string | undefined) => OpenApiDocument;

/** Reads the document from `localPath`, or downloads it from `url` when no local copy is given. */
export const readSpec = async (url: string, localPath: string | undefined, parse: SpecParser = parseJsonSpec) =>
  parse(await loadSpecText(url, localPath), localPath);
