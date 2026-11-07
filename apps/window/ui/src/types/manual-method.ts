import type { CredentialOption } from "@usemcpkit/core";

export interface ManualMethod {
  type: "manual";
  key: string;
  label: string;
  option: CredentialOption;
}
