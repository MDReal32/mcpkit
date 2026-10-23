import { validateUiAction } from "./validate-ui-action";

export const validateUiActions = (actions: unknown, location: string, hasDomain: boolean, allowsCli: boolean) => {
  if (actions === undefined) {
    return [];
  }
  if (!Array.isArray(actions)) {
    return [`${location} must be an array`];
  }
  return actions.flatMap((action, index) => validateUiAction(action, `${location}[${index}]`, hasDomain, allowsCli));
};
