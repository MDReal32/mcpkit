import { OPTIONAL_MARKER } from './const';
import type { Param } from './types/param';

export const isRequiredParam = (param: Param) => !param[OPTIONAL_MARKER] && param.default === undefined;
