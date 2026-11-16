import { spawn } from "node:child_process";
import { once } from "node:events";

export const runCommand = async (command: string, args: string[], cwd: string) => {
  const child = spawn(command, args, { cwd, stdio: ["ignore", "inherit", "inherit"] });
  const [code] = await once(child, "exit");
  if (code !== 0) {
    throw new Error(`${command} ${args.join(" ")} exited with ${code}`);
  }
};
