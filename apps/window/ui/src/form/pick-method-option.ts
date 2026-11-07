import type { ConnectionMethod } from "../types/connection-method";

/** The auth option a method answers for; the sign-in belongs to none. */
export const pickMethodOption = (method: ConnectionMethod) => {
  switch (method.type) {
    case "manual":
      return method.option.index;
    case "cli":
      return method.option;
    case "sign-in":
      return undefined;
  }
};
