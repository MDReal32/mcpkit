import { delimiter, join } from "node:path";
import { WINDOWS_DEFAULT_PATH_EXTENSIONS } from "../const";
import { isExecutableFile } from "./is-executable-file";

/** Looks the command up on PATH the way `execFile` will run it. */
export const isCommandInstalled = async (command: string) => {
  const directories = (process.env.PATH ?? "").split(delimiter).filter(Boolean);
  const extensions =
    process.platform === "win32" ? ["", ...(process.env.PATHEXT ?? WINDOWS_DEFAULT_PATH_EXTENSIONS).split(";")] : [""];
  const candidates = directories.flatMap((directory) =>
    extensions.map((extension) => join(directory, `${command}${extension}`)),
  );
  const found = await Promise.all(candidates.map(isExecutableFile));
  return found.includes(true);
};
