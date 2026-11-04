import type { Env } from "@usemcpkit/core";
import { adoptLegacyHome, describeError, resolveHomeDir, resolveLegacyHomeDir } from "@usemcpkit/core";
import { printError } from "../output/print-error";

/**
 * Brings the credentials an older `mcpkit` release saved into the usemcpkit home before the first call reads them. A
 * failed copy only costs a new prompt for them, so the server reports it and serves on.
 */
export const adoptLegacyCredentials = async (env: Env = process.env) => {
  const legacyHome = resolveLegacyHomeDir(env);
  if (legacyHome === undefined) {
    return;
  }
  const home = resolveHomeDir(env);
  try {
    if (await adoptLegacyHome(home, legacyHome)) {
      printError(`usemcpkit: copied the saved credentials from ${legacyHome} to ${home}`);
    }
  } catch (error) {
    printError(`usemcpkit: cannot copy the saved credentials from ${legacyHome}: ${describeError(error)}`);
  }
};
