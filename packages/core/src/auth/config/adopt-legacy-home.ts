import { join } from "node:path";
import { SAVED_FILE_NAMES } from "../const";
import { writePrivateTextFile } from "../secrets/write-private-text-file";
import { readTokensText } from "../token-store/read-tokens-text";
import { fileExists } from "./file-exists";

/**
 * Copies the files an older `mcpkit` release saved credentials in from `legacyHome` into `home`, once: only while
 * `home` has none of them yet, so what was saved since is never overwritten. The old folder is left as it is, for a
 * client that still runs the old binary. Resolves true when it copied anything.
 */
export const adoptLegacyHome = async (home: string, legacyHome: string) => {
  for (const name of SAVED_FILE_NAMES) {
    if (await fileExists(join(home, name))) {
      return false;
    }
  }
  let copied = false;
  for (const name of SAVED_FILE_NAMES) {
    const text = await readTokensText(join(legacyHome, name));
    if (text !== undefined) {
      await writePrivateTextFile(join(home, name), text);
      copied = true;
    }
  }
  return copied;
};
