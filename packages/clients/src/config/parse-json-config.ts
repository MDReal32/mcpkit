import type { ParseError } from "jsonc-parser";
import { parse, printParseErrorCode } from "jsonc-parser";

/** Parses JSON with comments and trailing commas; fails instead of editing a file it cannot read. */
export const parseJsonConfig = (text: string, path: string) => {
  const errors: ParseError[] = [];
  const data: unknown = text.trim() ? parse(text, errors, { allowTrailingComma: true }) : {};
  const [first] = errors;
  if (first) {
    throw new Error(`${path}: invalid JSON (${printParseErrorCode(first.error)} at offset ${first.offset})`);
  }
  return data;
};
