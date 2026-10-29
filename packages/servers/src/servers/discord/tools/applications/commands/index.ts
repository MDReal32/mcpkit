import { applicationsCommandsBulkSetApplicationCommands } from "./bulk-set-application-commands";
import { applicationsCommandsBulkSetGuildApplicationCommands } from "./bulk-set-guild-application-commands";
import { applicationsCommandsCreateApplicationCommand } from "./create-application-command";
import { applicationsCommandsCreateGuildApplicationCommand } from "./create-guild-application-command";
import { applicationsCommandsDeleteApplicationCommand } from "./delete-application-command";
import { applicationsCommandsDeleteGuildApplicationCommand } from "./delete-guild-application-command";
import { applicationsCommandsGetApplicationCommand } from "./get-application-command";
import { applicationsCommandsGetGuildApplicationCommand } from "./get-guild-application-command";
import { applicationsCommandsGetGuildApplicationCommandPermissions } from "./get-guild-application-command-permissions";
import { applicationsCommandsListApplicationCommands } from "./list-application-commands";
import { applicationsCommandsListGuildApplicationCommandPermissions } from "./list-guild-application-command-permissions";
import { applicationsCommandsListGuildApplicationCommands } from "./list-guild-application-commands";
import { applicationsCommandsSetGuildApplicationCommandPermissions } from "./set-guild-application-command-permissions";
import { applicationsCommandsUpdateApplicationCommand } from "./update-application-command";
import { applicationsCommandsUpdateGuildApplicationCommand } from "./update-guild-application-command";

export const applicationsCommandsTools = [
  applicationsCommandsBulkSetApplicationCommands,
  applicationsCommandsBulkSetGuildApplicationCommands,
  applicationsCommandsCreateApplicationCommand,
  applicationsCommandsCreateGuildApplicationCommand,
  applicationsCommandsDeleteApplicationCommand,
  applicationsCommandsDeleteGuildApplicationCommand,
  applicationsCommandsGetApplicationCommand,
  applicationsCommandsGetGuildApplicationCommand,
  applicationsCommandsGetGuildApplicationCommandPermissions,
  applicationsCommandsListApplicationCommands,
  applicationsCommandsListGuildApplicationCommandPermissions,
  applicationsCommandsListGuildApplicationCommands,
  applicationsCommandsSetGuildApplicationCommandPermissions,
  applicationsCommandsUpdateApplicationCommand,
  applicationsCommandsUpdateGuildApplicationCommand,
];
