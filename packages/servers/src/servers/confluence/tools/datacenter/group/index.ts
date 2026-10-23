import { datacenterGroupGet } from "./get";
import { datacenterGroupGetGroupancestor } from "./get-groupancestor";
import { datacenterGroupGetGroupancestor2 } from "./get-groupancestor-2";
import { datacenterGroupGetGroupmember } from "./get-groupmember";
import { datacenterGroupGetGroupmember2 } from "./get-groupmember-2";
import { datacenterGroupGetGroupparent } from "./get-groupparent";
import { datacenterGroupGetGroupparent2 } from "./get-groupparent-2";
import { datacenterGroupGetInfo } from "./get-info";
import { datacenterGroupGetMember } from "./get-member";
import { datacenterGroupGetMember2 } from "./get-member-2";
import { datacenterGroupList } from "./list";

export const datacenterGroupTools = [
  datacenterGroupGet,
  datacenterGroupGetGroupancestor,
  datacenterGroupGetGroupancestor2,
  datacenterGroupGetGroupmember,
  datacenterGroupGetGroupmember2,
  datacenterGroupGetGroupparent,
  datacenterGroupGetGroupparent2,
  datacenterGroupGetInfo,
  datacenterGroupGetMember,
  datacenterGroupGetMember2,
  datacenterGroupList,
];
