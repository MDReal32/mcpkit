import { codeQualityGetFinding } from './get-finding';
import { codeQualityGetSetup } from './get-setup';
import { codeQualityListFindingsForRepo } from './list-findings-for-repo';
import { codeQualityUpdateSetup } from './update-setup';

export const codeQualityTools = [
  codeQualityGetFinding,
  codeQualityGetSetup,
  codeQualityListFindingsForRepo,
  codeQualityUpdateSetup,
];
