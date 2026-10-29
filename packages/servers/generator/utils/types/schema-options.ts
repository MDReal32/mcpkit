export interface SchemaOptions {
  /** Object properties below this depth are dropped from the converted schema. */
  maxDepth: number;
  includeDefaults: boolean;
  /** A oneOf/anyOf mixing scalar types becomes `string` when one of the variants is a string. */
  widenMixedScalarsToString: boolean;
  stripBold: boolean;
  /** An exploded query array of scalars stays an array argument, sent as one repeated key per item; otherwise it becomes a comma-separated string. */
  keepsExplodedArrays: boolean;
}
