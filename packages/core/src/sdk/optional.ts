import { OPTIONAL_MARKER } from './const';
import type { Param } from './types/param';

/** Marks a param as not required. Params with a default are optional implicitly. */
export const optional = (param: Param) => {
  const marked: Param = { ...param, [OPTIONAL_MARKER]: true };
  return marked;
};
