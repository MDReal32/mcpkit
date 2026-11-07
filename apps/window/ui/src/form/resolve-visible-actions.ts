import type { CredentialOption, CredentialRequest } from "@usemcpkit/core";
import { isDomainValue, resolveLinkUrl } from "@usemcpkit/core";
import type { FormDraft } from "../types/form-draft";
import type { VisibleAction } from "../types/visible-action";

/**
 * The links under an option's fields. They follow the domain field while it holds a valid domain, so they point at the
 * host being typed; a link that needs a domain stays hidden until there is one. CLI actions are connection methods of
 * their own and are not listed here.
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
    if (action.type !== "link") {
      return;
    }
    const href = resolveLinkUrl(action.url, domain, request.loopbackHttp === true);
    if (href) {
      visible.push({ index, label: action.label, href });
    }
  });
  return visible;
};
