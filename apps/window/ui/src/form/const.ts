import type { ComparisonOperator } from "../types/version-comparison";

export const VERSION_PLACEHOLDER = "{version}";

/** The operators of a version condition, the two-character ones first so `<=` is not read as `<`. */
export const COMPARISON_OPERATORS: readonly ComparisonOperator[] = ["<=", ">=", "==", "!=", "<", ">"];

export const FLIPPED_OPERATORS: Record<ComparisonOperator, ComparisonOperator> = {
  "<": ">",
  "<=": ">=",
  ">": "<",
  ">=": "<=",
  "==": "==",
  "!=": "!=",
};

/** A token of a version condition: `{version}`, a version, an operator or `&&`. */
export const CONDITION_TOKEN_PATTERN = /\s*(\{version\}|&&|<=|>=|==|!=|<|>|\d+(?:\.\d+)*)/y;
