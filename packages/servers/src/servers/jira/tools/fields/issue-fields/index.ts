import { fieldsIssueFieldsCreateCustomField } from "./create-custom-field";
import { fieldsIssueFieldsDeleteCustomField } from "./delete-custom-field";
import { fieldsIssueFieldsGetContextsForFieldDeprecated } from "./get-contexts-for-field-deprecated";
import { fieldsIssueFieldsGetFieldProjectAssociations } from "./get-field-project-associations";
import { fieldsIssueFieldsGetFields } from "./get-fields";
import { fieldsIssueFieldsGetFieldsPaginated } from "./get-fields-paginated";
import { fieldsIssueFieldsGetProjectFields } from "./get-project-fields";
import { fieldsIssueFieldsGetTrashedFieldsPaginated } from "./get-trashed-fields-paginated";
import { fieldsIssueFieldsRestoreCustomField } from "./restore-custom-field";
import { fieldsIssueFieldsTrashCustomField } from "./trash-custom-field";
import { fieldsIssueFieldsUpdateCustomField } from "./update-custom-field";

export const fieldsIssueFieldsTools = [
  fieldsIssueFieldsCreateCustomField,
  fieldsIssueFieldsDeleteCustomField,
  fieldsIssueFieldsGetContextsForFieldDeprecated,
  fieldsIssueFieldsGetFieldProjectAssociations,
  fieldsIssueFieldsGetFields,
  fieldsIssueFieldsGetFieldsPaginated,
  fieldsIssueFieldsGetProjectFields,
  fieldsIssueFieldsGetTrashedFieldsPaginated,
  fieldsIssueFieldsRestoreCustomField,
  fieldsIssueFieldsTrashCustomField,
  fieldsIssueFieldsUpdateCustomField,
];
