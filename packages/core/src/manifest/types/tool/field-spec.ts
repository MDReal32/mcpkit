import type { NameList } from "./name-list";
import type { NameMapping } from "./name-mapping";

/** A list keeps fields as-is; a mapping is `{ outputName: "source.path" }`, where `items[].name` maps arrays. */
export type FieldSpec = NameList | NameMapping;
