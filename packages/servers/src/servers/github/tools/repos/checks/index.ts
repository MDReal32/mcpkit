import { reposChecksCreate } from './create';
import { reposChecksCreateSuite } from './create-suite';
import { reposChecksGet } from './get';
import { reposChecksGetSuite } from './get-suite';
import { reposChecksListAnnotations } from './list-annotations';
import { reposChecksListForRef } from './list-for-ref';
import { reposChecksListForSuite } from './list-for-suite';
import { reposChecksListSuitesForRef } from './list-suites-for-ref';
import { reposChecksRerequestRun } from './rerequest-run';
import { reposChecksRerequestSuite } from './rerequest-suite';
import { reposChecksSetSuitesPreferences } from './set-suites-preferences';
import { reposChecksUpdate } from './update';

export const reposChecksTools = [
  reposChecksCreate,
  reposChecksCreateSuite,
  reposChecksGet,
  reposChecksGetSuite,
  reposChecksListAnnotations,
  reposChecksListForRef,
  reposChecksListForSuite,
  reposChecksListSuitesForRef,
  reposChecksRerequestRun,
  reposChecksRerequestSuite,
  reposChecksSetSuitesPreferences,
  reposChecksUpdate,
];
