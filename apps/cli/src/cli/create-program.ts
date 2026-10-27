import { Program } from "yargs-extended";
import { VERSION } from "../version";
import { registerExposeCommand } from "./commands/expose-command";
import { registerInstallCommand } from "./commands/install-command";
import { registerListCommand } from "./commands/list-command";
import { registerServeCommand } from "./commands/serve-command";
import { registerUninstallCommand } from "./commands/uninstall-command";
import { registerUpdateCommand } from "./commands/update-command";
import { registerUpgradeCommand } from "./commands/upgrade-command";
import { registerValidateCommand } from "./commands/validate-command";
import { describeProgram } from "./output/describe-program";

/** Every command registers itself; a new command is one file in `commands/` and one line here. */
export const createProgram = (argv: string[]) => {
  const program = Program.createProgram(argv).name("usemcpkit").description(describeProgram()).version(VERSION);
  registerInstallCommand(program);
  registerUninstallCommand(program);
  registerUpgradeCommand(program);
  registerServeCommand(program);
  registerListCommand(program);
  registerExposeCommand(program);
  registerUpdateCommand(program);
  registerValidateCommand(program);
  return program;
};
