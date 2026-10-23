import { join } from "node:path";
import type { ClientContext } from "../types/client-context";

export const resolveDevinDir = (context: ClientContext) =>
  join(context.platform === "win32" ? context.appDataDir : context.xdgConfigDir, "devin");
