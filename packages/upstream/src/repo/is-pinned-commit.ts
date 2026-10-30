import type { UpstreamRepo } from "@usemcpkit/core";
import { COMMIT_PATTERN } from "./const";

/** A full commit id never moves, so there is nothing to compare with the remote. */
export const isPinnedCommit = ({ ref }: UpstreamRepo) => COMMIT_PATTERN.test(ref);
