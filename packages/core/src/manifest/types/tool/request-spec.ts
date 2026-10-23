import type { ArgSpec } from "./arg-spec";
import type { FixedValues } from "./fixed-values";
import type { HttpMethod } from "./http-method";

export interface RequestSpec {
  method: HttpMethod;
  /** `{arg}` placeholders are replaced by URL-encoded argument values. */
  path: string;
  query?: ArgSpec;
  /** Outgoing keys may be dotted paths such as `fields.project.key` or `ancestors.0.id` to build nested JSON. */
  body?: ArgSpec;
  /** Names the argument sent unchanged as the whole JSON body (an array, string or free-form object); excludes `body` and `fixedBody`. */
  bodyArg?: string;
  /** Defaults to `application/json`. A `text/*` type sends `bodyArg` as plain text, `multipart/form-data` sends `body` fields and `fileArgs` as form parts; any other type is sent as JSON. */
  contentType?: string;
  /** Outgoing query keys whose array values are joined with commas; other arrays repeat the key once per item. */
  commaQuery?: readonly string[];
  /**
   * Names of arguments holding a local file path or an array of them. With `contentType` multipart/form-data the files become form
   * parts; with `bodyArg` naming one of them the file is the raw request body.
   */
  fileArgs?: readonly string[];
  /** Names the argument holding the local path a successful response is saved to, instead of being returned. */
  saveToArg?: string;
  fixedQuery?: FixedValues;
  /** Header values sent on every call; auth headers win over them. */
  fixedHeaders?: Readonly<Record<string, string>>;
  /** Dotted paths like `body`; an argument with the same key wins. */
  fixedBody?: FixedValues;
}
