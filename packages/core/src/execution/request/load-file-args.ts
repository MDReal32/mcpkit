import type { ToolArgs, ToolSpec } from "../../manifest";
import { readUploadedFiles } from "./read-uploaded-files";

/** An argument may hold one path or an array of paths. */
export const loadFileArgs = async ({ request }: ToolSpec, args: ToolArgs): Promise<ToolArgs> => {
  const present = (request.fileArgs ?? []).filter((argName) => args[argName] !== undefined);
  const files = await Promise.all(
    present.map(async (argName) => [argName, await readUploadedFiles(argName, args[argName])]),
  );
  return { ...args, ...Object.fromEntries(files) };
};
