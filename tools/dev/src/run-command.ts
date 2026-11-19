import { spawn } from "node:child_process";
import { once } from "node:events";

export const runCommand = async (command: string, args: string[], cwd: string) => {
  const child = spawn(command, args, { cwd, stdio: ["ignore", "pipe", "pipe"] });
  let output = "";
  child.stdout.on("data", (chunk) => {
    output += chunk;
  });
  child.stderr.on("data", (chunk) => {
    output += chunk;
  });
  const [code] = await once(child, "exit");
  if (code !== 0) {
    process.stderr.write(output);
    throw new Error(`${command} ${args.join(" ")} exited with ${code}`);
  }
};
