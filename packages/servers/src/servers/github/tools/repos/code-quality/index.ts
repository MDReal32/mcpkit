import { reposCodeQualityGetFinding } from "./get-finding";
import { reposCodeQualityGetSetup } from "./get-setup";
import { reposCodeQualityListFindingsForRepo } from "./list-findings-for-repo";
import { reposCodeQualityUpdateSetup } from "./update-setup";

export const reposCodeQualityTools = [
  reposCodeQualityGetFinding,
  reposCodeQualityGetSetup,
  reposCodeQualityListFindingsForRepo,
  reposCodeQualityUpdateSetup,
];
