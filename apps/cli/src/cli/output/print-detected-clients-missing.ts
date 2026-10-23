import { CLIENT_DEFINITIONS } from "@usemcpkit/clients";
import { printError } from "./print-error";

export const printDetectedClientsMissing = () => {
  const supported = CLIENT_DEFINITIONS.map((definition) => definition.name).join(", ");
  printError(`no supported AI client found for this user. Supported: ${supported}`);
};
