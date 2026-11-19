import type { CheckProgress } from "../types/check-progress";

/**
 * Whether the credentials below the host wait for Check, which builds them from the version it found. A failed check
 * lets them show, since some servers answer their version only to signed-in users and Check sends what was typed.
 */
export const isAwaitingCheck = ({ canCheck, answered, failed }: CheckProgress) => canCheck && !answered && !failed;
