import type { DomainSource } from "./domain-source";

export interface DomainField {
  label: string;
  hint: string;
  placeholder: string;
  /** The domain in use, prefilled in the form; empty when there is none yet. */
  value: string;
  /** Hosts already used with this server, offered for picking; the user can still type a new one. */
  knownHosts: readonly string[];
  /** Hosts the server suggests (`domain.suggestedHosts`), offered after the known ones; none is picked for the user. */
  suggestedHosts?: readonly string[];
  /** Whether a Check button after the field asks the server its version (`domain.check`). */
  check?: boolean;
  /** The manifest's OpenAPI sources, in order: the first whose hosts match the typed host is the one in use. */
  sources?: readonly DomainSource[];
}
