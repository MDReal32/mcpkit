import { cloudV1UserAddContentWatcher } from "./add-content-watcher";
import { cloudV1UserAddLabelWatcher } from "./add-label-watcher";
import { cloudV1UserAddSpaceWatcher } from "./add-space-watcher";
import { cloudV1UserCreateUserProperty } from "./create-user-property";
import { cloudV1UserDeleteUserProperty } from "./delete-user-property";
import { cloudV1UserGetAnonymousUser } from "./get-anonymous-user";
import { cloudV1UserGetBulkUserLookup } from "./get-bulk-user-lookup";
import { cloudV1UserGetContentWatchStatus } from "./get-content-watch-status";
import { cloudV1UserGetCurrentUser } from "./get-current-user";
import { cloudV1UserGetGroupMembershipsForUser } from "./get-group-memberships-for-user";
import { cloudV1UserGetPrivacyUnsafeUserEmail } from "./get-privacy-unsafe-user-email";
import { cloudV1UserGetPrivacyUnsafeUserEmailBulk } from "./get-privacy-unsafe-user-email-bulk";
import { cloudV1UserGetUser } from "./get-user";
import { cloudV1UserGetUserProperties } from "./get-user-properties";
import { cloudV1UserGetUserProperty } from "./get-user-property";
import { cloudV1UserIsWatchingLabel } from "./is-watching-label";
import { cloudV1UserIsWatchingSpace } from "./is-watching-space";
import { cloudV1UserRemoveContentWatcher } from "./remove-content-watcher";
import { cloudV1UserRemoveLabelWatcher } from "./remove-label-watcher";
import { cloudV1UserRemoveSpaceWatch } from "./remove-space-watch";
import { cloudV1UserUpdateUserProperty } from "./update-user-property";

export const cloudV1UserTools = [
  cloudV1UserAddContentWatcher,
  cloudV1UserAddLabelWatcher,
  cloudV1UserAddSpaceWatcher,
  cloudV1UserCreateUserProperty,
  cloudV1UserDeleteUserProperty,
  cloudV1UserGetAnonymousUser,
  cloudV1UserGetBulkUserLookup,
  cloudV1UserGetContentWatchStatus,
  cloudV1UserGetCurrentUser,
  cloudV1UserGetGroupMembershipsForUser,
  cloudV1UserGetPrivacyUnsafeUserEmail,
  cloudV1UserGetPrivacyUnsafeUserEmailBulk,
  cloudV1UserGetUser,
  cloudV1UserGetUserProperties,
  cloudV1UserGetUserProperty,
  cloudV1UserIsWatchingLabel,
  cloudV1UserIsWatchingSpace,
  cloudV1UserRemoveContentWatcher,
  cloudV1UserRemoveLabelWatcher,
  cloudV1UserRemoveSpaceWatch,
  cloudV1UserUpdateUserProperty,
];
