import type { ComparisonOperator } from "../types/version-comparison";
import { COMPARISON_OPERATORS } from "./const";

export const isComparisonOperator = (token: string | undefined): token is ComparisonOperator =>
  COMPARISON_OPERATORS.some((operator) => operator === token);
