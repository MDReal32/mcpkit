import type { AuthCandidate } from '../types/auth-candidate';
import { preferredAuthLabels } from './preferred-auth-labels';

/** `tokens.json` always goes first so a fresh sign-in wins; the last working provided auth comes right after it. */
export const orderAuthCandidates = (serverName: string, candidates: readonly AuthCandidate[]) => {
  const preferredLabel = preferredAuthLabels.get(serverName);
  const isPreferred = (candidate: AuthCandidate) => candidate.kind === 'provided' && candidate.label === preferredLabel;
  return [
    ...candidates.filter((candidate) => candidate.kind === 'stored'),
    ...candidates.filter(isPreferred),
    ...candidates.filter((candidate) => candidate.kind !== 'stored' && !isPreferred(candidate)),
  ];
};
