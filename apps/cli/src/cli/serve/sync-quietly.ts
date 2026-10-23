import { describeError } from "@usemcpkit/core";
import { syncRegistry } from "../../registry";
import { printError } from "../output/print-error";

export const syncQuietly = async () => {
  try {
    await syncRegistry();
  } catch (error) {
    printError(`mcpkit: registry sync failed: ${describeError(error)}`);
  }
};
