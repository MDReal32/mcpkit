import { openFormWindow } from "../browser/open-form-window";
import { printError } from "./print-error";

export const announceCredentialsFormUrl = (url: string) => {
  printError(`Credentials required, open this URL to enter them:\n  ${url}`);
  openFormWindow(url);
};
