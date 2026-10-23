import type { BinaryContext } from "../types/binary-context";
import { isCompiledBinary } from "./is-compiled-binary";
import { isSameFilePath } from "./is-same-file-path";
import { resolveInstalledBinaryPath } from "./resolve-installed-binary-path";

export const isInstalledBinary = (context: BinaryContext) =>
  isCompiledBinary() && isSameFilePath(process.execPath, resolveInstalledBinaryPath(context.target, context.env));
