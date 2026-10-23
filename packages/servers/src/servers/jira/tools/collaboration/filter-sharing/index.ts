import { collaborationFilterSharingAddSharePermission } from "./add-share-permission";
import { collaborationFilterSharingDeleteSharePermission } from "./delete-share-permission";
import { collaborationFilterSharingGetDefaultShareScope } from "./get-default-share-scope";
import { collaborationFilterSharingGetSharePermission } from "./get-share-permission";
import { collaborationFilterSharingGetSharePermissions } from "./get-share-permissions";
import { collaborationFilterSharingSetDefaultShareScope } from "./set-default-share-scope";

export const collaborationFilterSharingTools = [
  collaborationFilterSharingAddSharePermission,
  collaborationFilterSharingDeleteSharePermission,
  collaborationFilterSharingGetDefaultShareScope,
  collaborationFilterSharingGetSharePermission,
  collaborationFilterSharingGetSharePermissions,
  collaborationFilterSharingSetDefaultShareScope,
];
