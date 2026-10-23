import { datacenterUserCreateCurrentPassword } from "./create-current-password";
import { datacenterUserCreateWatchContent } from "./create-watch-content";
import { datacenterUserCreateWatchSpace } from "./create-watch-space";
import { datacenterUserDeleteGroup } from "./delete-group";
import { datacenterUserDeleteWatchContent } from "./delete-watch-content";
import { datacenterUserDeleteWatchSpace } from "./delete-watch-space";
import { datacenterUserGetAnonymous } from "./get-anonymous";
import { datacenterUserGetCurrent } from "./get-current";
import { datacenterUserGetList } from "./get-list";
import { datacenterUserGetMemberof } from "./get-memberof";
import { datacenterUserGetWatchContent } from "./get-watch-content";
import { datacenterUserGetWatchSpace } from "./get-watch-space";
import { datacenterUserList } from "./list";
import { datacenterUserUpdateCurrent } from "./update-current";
import { datacenterUserUpdateGroup } from "./update-group";
import { datacenterUserUpdateSettings } from "./update-settings";

export const datacenterUserTools = [
  datacenterUserCreateCurrentPassword,
  datacenterUserCreateWatchContent,
  datacenterUserCreateWatchSpace,
  datacenterUserDeleteGroup,
  datacenterUserDeleteWatchContent,
  datacenterUserDeleteWatchSpace,
  datacenterUserGetAnonymous,
  datacenterUserGetCurrent,
  datacenterUserGetList,
  datacenterUserGetMemberof,
  datacenterUserGetWatchContent,
  datacenterUserGetWatchSpace,
  datacenterUserList,
  datacenterUserUpdateCurrent,
  datacenterUserUpdateGroup,
  datacenterUserUpdateSettings,
];
