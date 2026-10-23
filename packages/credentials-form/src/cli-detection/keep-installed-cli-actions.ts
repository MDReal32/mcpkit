import type { CredentialRequest } from "@usemcpkit/core";
import { isCommandInstalled } from "./is-command-installed";

/** Drops CLI buttons whose program is not on PATH, before the page sees the request, so action indexes stay valid. */
export const keepInstalledCliActions = async (request: CredentialRequest) => {
  const commands = new Set(
    request.options.flatMap((option) =>
      option.actions.flatMap((action) => (action.type === "cli" ? [action.command] : [])),
    ),
  );
  const checked = await Promise.all(
    Array.from(commands, async (command) => ((await isCommandInstalled(command)) ? [command] : [])),
  );
  const installed = new Set(checked.flat());
  const filtered: CredentialRequest = {
    ...request,
    options: request.options.map((option) => ({
      ...option,
      actions: option.actions.filter((action) => action.type !== "cli" || installed.has(action.command)),
    })),
  };
  return filtered;
};
