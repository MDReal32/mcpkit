import type { CredentialRequest } from "@usemcpkit/core";
import type { ConnectionMethod } from "../types/connection-method";

/** The sign-in first, then for every auth option its manual credentials followed by its CLI imports. */
export const buildMethods = (request: CredentialRequest) => {
  const methods: ConnectionMethod[] = [];
  if (request.signIn) {
    methods.push({ type: "sign-in", key: "sign-in", label: request.texts.signInLabel });
  }
  for (const option of request.options) {
    methods.push({ type: "manual", key: `manual:${option.index}`, label: option.label, option });
    option.actions.forEach((action, index) => {
      if (action.type === "cli") {
        methods.push({
          type: "cli",
          key: `cli:${option.index}:${index}`,
          label: action.label,
          option: option.index,
          action: index,
        });
      }
    });
  }
  return methods;
};
