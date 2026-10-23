import { createProgram } from "./create-program";

/** Sets `process.exitCode`. No command (or only install flags) means install. In serve mode stdout carries only JSON-RPC. */
export const runCli = async (argv: string[]) => {
  await createProgram(argv).parseAsync(argv);
};
