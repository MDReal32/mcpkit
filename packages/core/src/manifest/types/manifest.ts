import type { AuthSpec } from "./auth/auth-spec";
import type { OpenApiSpec } from "./openapi/open-api-spec";
import type { DomainSpec } from "./server/domain-spec";
import type { EditionSpec } from "./server/edition-spec";
import type { ToolSpec } from "./tool/tool-spec";
import type { UiSpec } from "./ui/ui-spec";
import type { UpstreamSpec } from "./upstream/upstream-spec";

export interface Manifest {
  name: string;
  /** Groups servers of one kind, for example `git`. */
  category: string;
  version: string;
  description?: string;
  /** May contain `{domain}`, as may the oauth URLs (`discovery` included) and an HTTP upstream's `url`; `domain` then says where the value comes from. A manifest with an `upstream` and no tools never requests it, so it only names the service's https home. */
  baseUrl: string;
  domain?: DomainSpec;
  /** Deployments picked by the domain's host; a domain matching none uses the tools' own requests. */
  editions?: Readonly<Record<string, EditionSpec>>;
  headers?: Readonly<Record<string, string>>;
  /** OAuth2 entries first, then fallbacks; tried top to bottom, the first that works is used. */
  auth?: readonly AuthSpec[];
  /** Page-wide texts of the credentials page, replacing usemcpkit's defaults. */
  ui?: UiSpec;
  /** Another MCP server this one fronts: its tools are discovered at runtime and listed beside `tools`, which may be empty. An HTTP upstream may have its own `auth`. */
  upstream?: UpstreamSpec;
  /** Tools built on the user's machine from the OpenAPI document of the server's version; the hand-written `tools` replace built ones of the same name where their `applies` says. */
  openapi?: OpenApiSpec;
  tools: readonly ToolSpec[];
}
