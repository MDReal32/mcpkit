import { isTarget, TARGETS } from '@usemcpkit/binary';

/** No requested names selects every target; unknown names fail fast. */
export const selectTargets = (requested: readonly string[] = []) => {
  if (requested.length === 0) {
    return TARGETS;
  }
  const unknown = requested.filter((name) => !isTarget(name));
  if (unknown.length > 0) {
    throw new Error(`unknown target(s): ${unknown.join(', ')}. Known: ${TARGETS.join(', ')}`);
  }
  return requested.filter(isTarget);
};
