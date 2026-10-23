import { appsUiModificationsAppsCreateUiModification } from './create-ui-modification';
import { appsUiModificationsAppsDeleteUiModification } from './delete-ui-modification';
import { appsUiModificationsAppsGetUiModifications } from './get-ui-modifications';
import { appsUiModificationsAppsUpdateUiModification } from './update-ui-modification';

export const appsUiModificationsAppsTools = [
  appsUiModificationsAppsCreateUiModification,
  appsUiModificationsAppsDeleteUiModification,
  appsUiModificationsAppsGetUiModifications,
  appsUiModificationsAppsUpdateUiModification,
];
