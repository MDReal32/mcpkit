import { isJsonObject } from "@usemcpkit/core";
import type { RepoState } from "../types/repo-state";

const isRepoState = (value: unknown): value is RepoState =>
  isJsonObject(value) &&
  typeof value.signature === "string" &&
  typeof value.updatedAt === "number" &&
  typeof value.checkedAt === "number" &&
  (value.commit === undefined || typeof value.commit === "string");

/** A marker written before states existed held the repo spec alone: it is kept as the signature, never checked. */
const toLegacyState = (text: string) => {
  const state: RepoState = { signature: text, updatedAt: 0, checkedAt: 0 };
  return state;
};

export const parseRepoState = (text: string) => {
  try {
    const body: unknown = JSON.parse(text);
    return isRepoState(body) ? body : toLegacyState(text);
  } catch {
    return toLegacyState(text);
  }
};
