export type ComparisonOperator = "<" | "<=" | ">" | ">=" | "==" | "!=";

/** `{version} <operator> <version>`, one comparison of an `applies.if` condition. */
export interface VersionComparison {
  operator: ComparisonOperator;
  version: string;
}
