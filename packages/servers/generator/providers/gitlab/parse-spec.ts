import { parse } from "yaml";
import { dereference } from "../../utils/spec/dereference";
import type { OpenApiDocument } from "../../utils/types/open-api-operation";

interface RawDocument {
  paths: unknown;
}

export const parseSpec = (text: string, localPath: string | undefined) => {
  const raw = (localPath?.endsWith(".json") ? JSON.parse(text) : parse(text)) as RawDocument;
  return { paths: dereference(raw, raw.paths) } as OpenApiDocument;
};
