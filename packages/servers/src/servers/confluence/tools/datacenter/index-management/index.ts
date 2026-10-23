import { datacenterIndexManagementCreateReindex } from "./create-reindex";
import { datacenterIndexManagementCreateUnindex } from "./create-unindex";
import { datacenterIndexManagementGetReindex } from "./get-reindex";
import { datacenterIndexManagementUpdateResetjob } from "./update-resetjob";

export const datacenterIndexManagementTools = [
  datacenterIndexManagementCreateReindex,
  datacenterIndexManagementCreateUnindex,
  datacenterIndexManagementGetReindex,
  datacenterIndexManagementUpdateResetjob,
];
