import type { ResolvedAuth } from "../types/resolved-auth";

export const createResolvedAuth = (headers: ResolvedAuth["headers"] = {}, query: ResolvedAuth["query"] = {}) => {
  const resolved: ResolvedAuth = { headers, query };
  return resolved;
};
