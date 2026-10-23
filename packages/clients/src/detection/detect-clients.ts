import { CLIENT_DEFINITIONS } from "../client-definitions";
import type { ClientContext } from "../types/client-context";
import { inspectClient } from "./inspect-client";
import { isClientInstalled } from "./is-client-installed";

/** Clients installed for this user, in CLIENT_DEFINITIONS order. */
export const detectClients = async (context: ClientContext, definitions = CLIENT_DEFINITIONS) => {
  const installed = await Promise.all(definitions.map((definition) => isClientInstalled(definition, context)));
  const present = definitions.filter((_, index) => installed[index]);
  return Promise.all(present.map((definition) => inspectClient(definition, context)));
};
