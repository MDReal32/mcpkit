import type { FallbackAuth, UiTexts } from '../../../manifest';
import { fillTemplate } from '../../../manifest';
import { toCredentialField } from './to-credential-field';

export const listCredentialFields = (auth: FallbackAuth, texts: UiTexts) => {
  if (auth.type === 'none') {
    return [];
  }
  const inputs = auth.ui?.inputs;
  switch (auth.type) {
    case 'bearer':
      return [toCredentialField(auth.env, texts.tokenLabel, true, texts, inputs?.[auth.env])];
    case 'header':
      return [
        toCredentialField(
          auth.env,
          fillTemplate(texts.headerLabel, { name: auth.name }),
          true,
          texts,
          inputs?.[auth.env],
        ),
      ];
    case 'query':
      return [
        toCredentialField(
          auth.env,
          fillTemplate(texts.queryLabel, { name: auth.name }),
          true,
          texts,
          inputs?.[auth.env],
        ),
      ];
    case 'basic':
      return [
        toCredentialField(auth.usernameEnv, texts.usernameLabel, false, texts, inputs?.[auth.usernameEnv]),
        toCredentialField(auth.passwordEnv, texts.passwordLabel, true, texts, inputs?.[auth.passwordEnv]),
      ];
    default: {
      const unsupported: never = auth;
      return unsupported;
    }
  }
};
