import { cloudDatabasesAddDatabasePermissions } from './add-database-permissions';
import { cloudDatabasesCreateDatabase } from './create-database';
import { cloudDatabasesCreateDatabaseProperty } from './create-database-property';
import { cloudDatabasesDeleteDatabase } from './delete-database';
import { cloudDatabasesDeleteDatabasePermissions } from './delete-database-permissions';
import { cloudDatabasesDeleteDatabasePropertyById } from './delete-database-property-by-id';
import { cloudDatabasesGetDatabaseAncestors } from './get-database-ancestors';
import { cloudDatabasesGetDatabaseById } from './get-database-by-id';
import { cloudDatabasesGetDatabaseClassificationLevel } from './get-database-classification-level';
import { cloudDatabasesGetDatabaseContentProperties } from './get-database-content-properties';
import { cloudDatabasesGetDatabaseContentPropertiesById } from './get-database-content-properties-by-id';
import { cloudDatabasesGetDatabaseDescendants } from './get-database-descendants';
import { cloudDatabasesGetDatabaseDirectChildren } from './get-database-direct-children';
import { cloudDatabasesGetDatabaseEntries } from './get-database-entries';
import { cloudDatabasesGetDatabaseEntryById } from './get-database-entry-by-id';
import { cloudDatabasesGetDatabaseFields } from './get-database-fields';
import { cloudDatabasesGetDatabaseOperations } from './get-database-operations';
import { cloudDatabasesGetDatabasePermissions } from './get-database-permissions';
import { cloudDatabasesGetDatabaseRestrictionState } from './get-database-restriction-state';
import { cloudDatabasesGetDatabaseViews } from './get-database-views';
import { cloudDatabasesPostDatabaseClassificationLevel } from './post-database-classification-level';
import { cloudDatabasesPutDatabaseClassificationLevel } from './put-database-classification-level';
import { cloudDatabasesSetDatabasePermissions } from './set-database-permissions';
import { cloudDatabasesSetDatabaseRestrictionState } from './set-database-restriction-state';
import { cloudDatabasesUpdateDatabasePropertyById } from './update-database-property-by-id';

export const cloudDatabasesTools = [
  cloudDatabasesAddDatabasePermissions,
  cloudDatabasesCreateDatabase,
  cloudDatabasesCreateDatabaseProperty,
  cloudDatabasesDeleteDatabase,
  cloudDatabasesDeleteDatabasePermissions,
  cloudDatabasesDeleteDatabasePropertyById,
  cloudDatabasesGetDatabaseAncestors,
  cloudDatabasesGetDatabaseById,
  cloudDatabasesGetDatabaseClassificationLevel,
  cloudDatabasesGetDatabaseContentProperties,
  cloudDatabasesGetDatabaseContentPropertiesById,
  cloudDatabasesGetDatabaseDescendants,
  cloudDatabasesGetDatabaseDirectChildren,
  cloudDatabasesGetDatabaseEntries,
  cloudDatabasesGetDatabaseEntryById,
  cloudDatabasesGetDatabaseFields,
  cloudDatabasesGetDatabaseOperations,
  cloudDatabasesGetDatabasePermissions,
  cloudDatabasesGetDatabaseRestrictionState,
  cloudDatabasesGetDatabaseViews,
  cloudDatabasesPostDatabaseClassificationLevel,
  cloudDatabasesPutDatabaseClassificationLevel,
  cloudDatabasesSetDatabasePermissions,
  cloudDatabasesSetDatabaseRestrictionState,
  cloudDatabasesUpdateDatabasePropertyById,
];
