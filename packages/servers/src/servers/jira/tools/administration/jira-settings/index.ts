import { administrationJiraSettingsGetAdvancedSettings } from "./get-advanced-settings";
import { administrationJiraSettingsGetApplicationProperty } from "./get-application-property";
import { administrationJiraSettingsGetConfiguration } from "./get-configuration";
import { administrationJiraSettingsSetApplicationProperty } from "./set-application-property";

export const administrationJiraSettingsTools = [
  administrationJiraSettingsGetAdvancedSettings,
  administrationJiraSettingsGetApplicationProperty,
  administrationJiraSettingsGetConfiguration,
  administrationJiraSettingsSetApplicationProperty,
];
