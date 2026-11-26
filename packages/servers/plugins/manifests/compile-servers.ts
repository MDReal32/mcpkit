import { basename } from "node:path";
import { compileServer } from "./compile-server";
import { listServerEntries } from "./list-server-entries";
import type { CompileResult } from "./types/compile-result";

/** Loads and validates every server folder in serversDir, in the order of the server names whatever their category folders. */
export const compileServers = async (serversDir: string) => {
  const entries = (await listServerEntries(serversDir)).sort((left, right) =>
    basename(left.dir) < basename(right.dir) ? -1 : 1,
  );
  const outcomes = await Promise.all(entries.map(compileServer));
  const result: CompileResult = {
    compiled: outcomes.flatMap((outcome) => outcome.compiled ?? []),
    errors: outcomes.flatMap((outcome) => outcome.errors.map((error) => `${outcome.dir}: ${error}`)),
    dependencies: [...new Set(outcomes.flatMap((outcome) => outcome.dependencies))],
  };
  return result;
};
