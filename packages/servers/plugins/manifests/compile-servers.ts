import { compileServer } from "./compile-server";
import { listServerEntries } from "./list-server-entries";
import type { CompileResult } from "./types/compile-result";

/** Loads and validates every server folder in serversDir. */
export const compileServers = async (serversDir: string) => {
  const outcomes = await Promise.all((await listServerEntries(serversDir)).map(compileServer));
  const result: CompileResult = {
    compiled: outcomes.flatMap((outcome) => outcome.compiled ?? []),
    errors: outcomes.flatMap((outcome) => outcome.errors.map((error) => `${outcome.dir}: ${error}`)),
    dependencies: [...new Set(outcomes.flatMap((outcome) => outcome.dependencies))],
  };
  return result;
};
