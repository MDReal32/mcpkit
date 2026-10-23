import { isInteractiveAuthType } from "../guards/is-interactive-auth-type";
import { readAuthType } from "./read-auth-type";

/**
 * OAuth2 entries come first, fallbacks after them.
 * `none` always succeeds, so anything after it would never be tried.
 */
export const validateAuthOrder = (entries: readonly unknown[]) => {
  const types = entries.map(readAuthType);
  const errors: string[] = [];
  const firstFallback = types.findIndex((type) => !isInteractiveAuthType(type));
  if (firstFallback !== -1 && types.slice(firstFallback).some(isInteractiveAuthType)) {
    errors.push("auth: fallback entries must come after every oauth entry");
  }
  if (types.slice(0, -1).includes("none")) {
    errors.push('auth: "none" can only be the last entry');
  }
  return errors;
};
