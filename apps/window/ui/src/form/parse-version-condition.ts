import type { VersionComparison } from "../types/version-comparison";
import { FLIPPED_OPERATORS, VERSION_PLACEHOLDER } from "./const";
import { isComparisonOperator } from "./is-comparison-operator";
import { tokenizeCondition } from "./tokenize-condition";

/**
 * The comparisons of an `applies.if` condition such as `9.0 <= {version} < 10` or `{version} >= 9.0 && {version} < 10`,
 * each with `{version}` on its left; throws on what the server would not accept either.
 */
export const parseVersionCondition = (text: string) => {
  const comparisons: VersionComparison[] = [];
  const invalid = () => new Error(`"${text}" is not a version condition`);
  for (const clause of tokenizeCondition(text).join(" ").split("&&")) {
    const tokens = clause.trim().split(" ");
    if (tokens.length < 3 || tokens.length % 2 === 0) {
      throw invalid();
    }
    for (let index = 0; index + 2 < tokens.length; index += 2) {
      const [left, operator, right] = [tokens[index], tokens[index + 1], tokens[index + 2]];
      if (!isComparisonOperator(operator) || left === undefined || right === undefined) {
        throw invalid();
      }
      if (left === VERSION_PLACEHOLDER && right !== VERSION_PLACEHOLDER && !isComparisonOperator(right)) {
        comparisons.push({ operator, version: right });
      } else if (right === VERSION_PLACEHOLDER && left !== VERSION_PLACEHOLDER && !isComparisonOperator(left)) {
        comparisons.push({ operator: FLIPPED_OPERATORS[operator], version: left });
      } else {
        throw invalid();
      }
    }
  }
  return comparisons;
};
