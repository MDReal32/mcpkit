import type { OpenApiParameter } from "./open-api-operation";

export interface ArgumentNaming {
  /** A query parameter that shares its name with a path parameter is left out instead of renamed. */
  dropsQueryShadowedByPath: boolean;
  /** `taken` holds the arguments already claimed by earlier path and query parameters. */
  parameter: (parameter: OpenApiParameter, taken: ReadonlySet<string>) => string;
  /** `taken` holds the path and query arguments, `claimedByBody` the arguments of earlier body properties. */
  bodyProperty: (key: string, taken: ReadonlySet<string>, claimedByBody: ReadonlySet<string>) => string;
}
