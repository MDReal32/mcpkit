import type { UiInputSpec, UiTexts } from "../../../manifest";
import { fillTemplate } from "../../../manifest";
import type { CredentialField } from "../../types/credentials/credential-field";

export const toCredentialField = (
  key: string,
  label: string,
  secret: boolean,
  texts: UiTexts,
  spec: UiInputSpec | undefined,
) => {
  const field: CredentialField = {
    key,
    label: spec?.label ?? label,
    hint: spec?.hint ?? fillTemplate(texts.fieldHint, { key }),
    placeholder: spec?.placeholder ?? "",
    secret,
  };
  return field;
};
