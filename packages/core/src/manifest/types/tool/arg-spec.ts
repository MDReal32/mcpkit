import type { NameList } from './name-list';
import type { NameMapping } from './name-mapping';

/** A list passes args under their own names; a mapping is `{ outgoingKey: argName }`. */
export type ArgSpec = NameList | NameMapping;
