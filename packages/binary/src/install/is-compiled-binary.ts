import { basename } from "node:path";
import { BINARY_NAME } from "../platform";

/** A Bun-compiled binary is its own executable, so `process.execPath` is the mcpkit file rather than node. */
export const isCompiledBinary = (execPath: string = process.execPath) => basename(execPath).startsWith(BINARY_NAME);
