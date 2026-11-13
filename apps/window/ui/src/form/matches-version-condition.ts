import { compareVersions } from "./compare-versions";
import { holdsComparison } from "./holds-comparison";
import { parseVersionCondition } from "./parse-version-condition";

/** Whether `version` meets every comparison of an `applies.if` condition. */
export const matchesVersionCondition = (condition: string, version: string) =>
  parseVersionCondition(condition).every((comparison) =>
    holdsComparison(comparison.operator, compareVersions(version, comparison.version)),
  );
