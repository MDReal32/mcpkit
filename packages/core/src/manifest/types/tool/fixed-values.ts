import type { FixedValue } from "./fixed-value";

/** Values sent on every call, keyed like the outgoing keys of the request part they belong to. */
export type FixedValues = Readonly<Record<string, FixedValue>>;
