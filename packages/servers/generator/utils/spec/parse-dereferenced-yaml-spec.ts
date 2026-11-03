import { parse } from "yaml";
import type { OpenApiDocument } from "../types/open-api-operation";
import { dereference } from "./dereference";

interface RawDocument {
  paths: unknown;
}

/** Only `paths` is inlined: the components of a large document are never read once their references are resolved. */
export const parseDereferencedYamlSpec = (text: string) => {
  const raw = parse(text) as RawDocument;
  return { paths: dereference(raw, raw.paths) } as OpenApiDocument;
};
