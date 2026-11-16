import type { ComparisonOperator } from "../types/version-comparison";

/** Whether `left <operator> right` holds for two versions that `compareVersions` ordered as `ordering`. */
export const holdsComparison = (operator: ComparisonOperator, ordering: number) => {
  switch (operator) {
    case "<":
      return ordering < 0;
    case "<=":
      return ordering <= 0;
    case ">":
      return ordering > 0;
    case ">=":
      return ordering >= 0;
    case "==":
      return ordering === 0;
    case "!=":
      return ordering !== 0;
  }
};
