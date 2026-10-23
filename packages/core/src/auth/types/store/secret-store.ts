import type { SecretOwner } from "./secret-owner";

/** Where credentials and domains entered in the credentials form are kept, per server and key. */
export interface SecretStore {
  get: (owner: SecretOwner, key: string) => Promise<string | undefined>;
  set: (owner: SecretOwner, key: string, value: string) => Promise<void>;
}
