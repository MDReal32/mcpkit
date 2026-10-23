import type { CredentialOption, CredentialRequest } from '@mcpkit/core';
import { isDomainValue, resolveLinkUrl } from '@mcpkit/core';
import type { FormDraft } from '../types/form-draft';
import type { VisibleAction } from '../types/visible-action';

/**
 * Links follow the domain field while it holds a valid domain, so they point at the host being typed;
 * a link that needs a domain stays hidden until there is one.
 */
export const resolveVisibleActions = (
  request: CredentialRequest,
  draft: FormDraft,
  option: CredentialOption | undefined,
) => {
  const typed = draft.domain.trim();
  const domain = request.domain && isDomainValue(typed) ? typed : request.domainInUse;
  const visible: VisibleAction[] = [];
  option?.actions.forEach((action, index) => {
    if (action.type === 'cli') {
      visible.push({ index, type: 'cli', label: action.label });
      return;
    }
    const href = resolveLinkUrl(action.url, domain);
    if (href) {
      visible.push({ index, type: 'link', label: action.label, href });
    }
  });
  return visible;
};
