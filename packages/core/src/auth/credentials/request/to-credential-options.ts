import type { AuthSpec, UiTexts } from '../../../manifest';
import { describeAuthSpec, isInteractiveAuth } from '../../../manifest';
import type { CredentialOption } from '../../types/credentials/credential-option';
import { toOptionActions } from '../../ui/to-option-actions';
import { listCredentialFields } from './list-credential-fields';

export const toCredentialOptions = (auth: AuthSpec, index: number, serverName: string, texts: UiTexts) => {
  if (isInteractiveAuth(auth)) {
    return [];
  }
  const fields = listCredentialFields(auth, texts);
  if (fields.length === 0) {
    return [];
  }
  const option: CredentialOption = {
    index,
    label: ('label' in auth && auth.label) || describeAuthSpec(auth),
    fields,
    actions: toOptionActions('ui' in auth ? auth.ui : undefined, serverName, fields.length),
  };
  return [option];
};
