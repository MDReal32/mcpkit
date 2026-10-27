import { tasksCustomFieldsGetFolderCustomFields } from "./get-folder-custom-fields";
import { tasksCustomFieldsGetListCustomFields } from "./get-list-custom-fields";
import { tasksCustomFieldsGetSpaceCustomFields } from "./get-space-custom-fields";
import { tasksCustomFieldsGetWorkspaceCustomFields } from "./get-workspace-custom-fields";
import { tasksCustomFieldsRemoveCustomFieldValue } from "./remove-custom-field-value";
import { tasksCustomFieldsSetCustomFieldValue } from "./set-custom-field-value";

export const tasksCustomFieldsTools = [
  tasksCustomFieldsGetFolderCustomFields,
  tasksCustomFieldsGetListCustomFields,
  tasksCustomFieldsGetSpaceCustomFields,
  tasksCustomFieldsGetWorkspaceCustomFields,
  tasksCustomFieldsRemoveCustomFieldValue,
  tasksCustomFieldsSetCustomFieldValue,
];
