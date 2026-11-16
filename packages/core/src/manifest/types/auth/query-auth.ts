import type { Applies } from "../applies";
import type { UiSpec } from "../ui/ui-spec";
import type { QueryParam } from "./query-param";

export interface QueryAuth {
  type: "query";
  env: string;
  name: string;
  /** More query parameters the same entry sends, each from its own credential (Trello wants a key and a token). */
  extra?: QueryParam[];
  /** Shown for this option in the credentials form instead of its auth type and env vars. */
  label?: string;
  /** Texts, field labels and buttons of the credentials page for this entry. */
  ui?: UiSpec;
  /** In an OpenAPI manifest, the sources and versions the credentials form offers this entry for. */
  applies?: Applies;
}
