import type { AuthSpec } from './auth/auth-spec';
import type { DomainSpec } from './server/domain-spec';
import type { EditionSpec } from './server/edition-spec';
import type { ToolSpec } from './tool/tool-spec';
import type { UiSpec } from './ui/ui-spec';

export interface Manifest {
  name: string;
  /** Groups servers of one kind, for example `git`. */
  category: string;
  version: string;
  description?: string;
  /** May contain `{domain}`, as may the oauth URLs; `domain` then says where the value comes from. */
  baseUrl: string;
  domain?: DomainSpec;
  /** Deployments picked by the domain's host; a domain matching none uses the tools' own requests. */
  editions?: Readonly<Record<string, EditionSpec>>;
  headers?: Readonly<Record<string, string>>;
  /** OAuth2 entries first, then fallbacks; tried top to bottom, the first that works is used. */
  auth?: readonly AuthSpec[];
  /** Page-wide texts of the credentials page, replacing mcpkit's defaults. */
  ui?: UiSpec;
  tools: readonly ToolSpec[];
}
