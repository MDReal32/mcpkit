import { guildsTemplatesCreateGuildTemplate } from "./create-guild-template";
import { guildsTemplatesDeleteGuildTemplate } from "./delete-guild-template";
import { guildsTemplatesGetGuildTemplate } from "./get-guild-template";
import { guildsTemplatesListGuildTemplates } from "./list-guild-templates";
import { guildsTemplatesSyncGuildTemplate } from "./sync-guild-template";
import { guildsTemplatesUpdateGuildTemplate } from "./update-guild-template";

export const guildsTemplatesTools = [
  guildsTemplatesCreateGuildTemplate,
  guildsTemplatesDeleteGuildTemplate,
  guildsTemplatesGetGuildTemplate,
  guildsTemplatesListGuildTemplates,
  guildsTemplatesSyncGuildTemplate,
  guildsTemplatesUpdateGuildTemplate,
];
