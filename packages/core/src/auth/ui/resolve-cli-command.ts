import type { UiCliAction } from "../../manifest";
import { fillTemplate } from "../../manifest";
import { AuthError } from "../auth-error";
import type { CliTokenCommand } from "../types/credentials/cli-token-command";
import { toWebHost } from "./to-web-host";

export const resolveCliCommand = (action: UiCliAction, domain: string | undefined) => {
  const args = action.args.map((arg) => {
    const filled = fillTemplate(arg, { domain: domain ?? "", webHost: domain ? toWebHost(domain) : "" });
    if (filled !== arg && !domain) {
      throw new AuthError(`"${action.command}" needs a domain`);
    }
    return filled;
  });
  const command: CliTokenCommand = { command: action.command, args };
  return command;
};
