import type { BinaryContext } from "../types/binary-context";
import type { BinarySource } from "../types/binary-source";
import type { InstalledBinary } from "../types/installed-binary";
import { isCompiledBinary } from "./is-compiled-binary";
import { isSameFilePath } from "./is-same-file-path";
import { readInstallSourceBytes } from "./read-install-source-bytes";
import { resolveInstalledBinaryPath } from "./resolve-installed-binary-path";
import { writeBinaryFile } from "./write-binary-file";

export const installBinary = async (context: BinaryContext, source: BinarySource) => {
  const path = resolveInstalledBinaryPath(context.target, context.env);
  const installed: InstalledBinary = { path, version: source.version };
  if (!source.path && isCompiledBinary() && isSameFilePath(process.execPath, path)) {
    return installed;
  }
  await writeBinaryFile(path, await readInstallSourceBytes(context, source));
  return installed;
};
