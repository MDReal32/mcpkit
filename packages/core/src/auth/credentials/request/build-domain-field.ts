import type { Env } from "../../../env";
import type { Manifest, UiTexts } from "../../../manifest";
import type { DomainField } from "../../types/credentials/domain-field";

/** A domain set through its env var is not offered for editing. */
export const buildDomainField = (manifest: Manifest, domain: string | undefined, env: Env, texts: UiTexts) => {
  const spec = manifest.domain;
  if (!spec || (spec.env && env[spec.env])) {
    return undefined;
  }
  const field: DomainField = {
    label: spec.label ?? texts.domainLabel,
    hint: spec.hint ?? texts.domainHint,
    placeholder: spec.placeholder ?? texts.domainPlaceholder,
    value: domain ?? "",
  };
  return field;
};
