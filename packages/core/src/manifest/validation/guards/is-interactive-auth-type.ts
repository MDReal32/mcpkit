import { INTERACTIVE_AUTH_TYPES } from "../../const";

export const isInteractiveAuthType = (type: unknown) =>
  INTERACTIVE_AUTH_TYPES.some((interactiveType) => interactiveType === type);
