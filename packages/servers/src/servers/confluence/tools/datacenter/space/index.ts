import { datacenterSpaceCreate } from "./create";
import { datacenterSpaceCreateCategory } from "./create-category";
import { datacenterSpaceCreatePersonal } from "./create-personal";
import { datacenterSpaceCreatePrivate } from "./create-private";
import { datacenterSpaceCreateProperty } from "./create-property";
import { datacenterSpaceCreatePropertyByKey } from "./create-property-by-key";
import { datacenterSpaceDelete } from "./delete";
import { datacenterSpaceDeleteCategory } from "./delete-category";
import { datacenterSpaceDeleteProperty } from "./delete-property";
import { datacenterSpaceDeleteTrash } from "./delete-trash";
import { datacenterSpaceGet } from "./get";
import { datacenterSpaceGetColorScheme } from "./get-color-scheme";
import { datacenterSpaceGetColorSchemeType } from "./get-color-scheme-type";
import { datacenterSpaceGetContent } from "./get-content";
import { datacenterSpaceGetContentByType } from "./get-content-by-type";
import { datacenterSpaceGetLabels } from "./get-labels";
import { datacenterSpaceGetLabelsPopular } from "./get-labels-popular";
import { datacenterSpaceGetLabelsRecent } from "./get-labels-recent";
import { datacenterSpaceGetLabelsRelated } from "./get-labels-related";
import { datacenterSpaceGetPermissions } from "./get-permissions";
import { datacenterSpaceGetPermissionsAnonymous } from "./get-permissions-anonymous";
import { datacenterSpaceGetPermissionsGroup } from "./get-permissions-group";
import { datacenterSpaceGetPermissionsUser } from "./get-permissions-user";
import { datacenterSpaceGetProperty } from "./get-property";
import { datacenterSpaceGetPropertyByKey } from "./get-property-by-key";
import { datacenterSpaceGetTrash } from "./get-trash";
import { datacenterSpaceGetWatchers } from "./get-watchers";
import { datacenterSpaceList } from "./list";
import { datacenterSpaceUpdate } from "./update";
import { datacenterSpaceUpdateArchive } from "./update-archive";
import { datacenterSpaceUpdateColorScheme } from "./update-color-scheme";
import { datacenterSpaceUpdateColorSchemeReset } from "./update-color-scheme-reset";
import { datacenterSpaceUpdateColorSchemeType } from "./update-color-scheme-type";
import { datacenterSpaceUpdateProperty } from "./update-property";
import { datacenterSpaceUpdateRestore } from "./update-restore";

export const datacenterSpaceTools = [
  datacenterSpaceCreate,
  datacenterSpaceCreateCategory,
  datacenterSpaceCreatePersonal,
  datacenterSpaceCreatePrivate,
  datacenterSpaceCreateProperty,
  datacenterSpaceCreatePropertyByKey,
  datacenterSpaceDelete,
  datacenterSpaceDeleteCategory,
  datacenterSpaceDeleteProperty,
  datacenterSpaceDeleteTrash,
  datacenterSpaceGet,
  datacenterSpaceGetColorScheme,
  datacenterSpaceGetColorSchemeType,
  datacenterSpaceGetContent,
  datacenterSpaceGetContentByType,
  datacenterSpaceGetLabels,
  datacenterSpaceGetLabelsPopular,
  datacenterSpaceGetLabelsRecent,
  datacenterSpaceGetLabelsRelated,
  datacenterSpaceGetPermissions,
  datacenterSpaceGetPermissionsAnonymous,
  datacenterSpaceGetPermissionsGroup,
  datacenterSpaceGetPermissionsUser,
  datacenterSpaceGetProperty,
  datacenterSpaceGetPropertyByKey,
  datacenterSpaceGetTrash,
  datacenterSpaceGetWatchers,
  datacenterSpaceList,
  datacenterSpaceUpdate,
  datacenterSpaceUpdateArchive,
  datacenterSpaceUpdateColorScheme,
  datacenterSpaceUpdateColorSchemeReset,
  datacenterSpaceUpdateColorSchemeType,
  datacenterSpaceUpdateProperty,
  datacenterSpaceUpdateRestore,
];
