import { checksCreate } from './create';
import { checksCreateSuite } from './create-suite';
import { checksGet } from './get';
import { checksGetSuite } from './get-suite';
import { checksListAnnotations } from './list-annotations';
import { checksListForRef } from './list-for-ref';
import { checksListForSuite } from './list-for-suite';
import { checksListSuitesForRef } from './list-suites-for-ref';
import { checksRerequestRun } from './rerequest-run';
import { checksRerequestSuite } from './rerequest-suite';
import { checksSetSuitesPreferences } from './set-suites-preferences';
import { checksUpdate } from './update';

export const checksTools = [
  checksCreate,
  checksCreateSuite,
  checksGet,
  checksGetSuite,
  checksListAnnotations,
  checksListForRef,
  checksListForSuite,
  checksListSuitesForRef,
  checksRerequestRun,
  checksRerequestSuite,
  checksSetSuitesPreferences,
  checksUpdate,
];
