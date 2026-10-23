import type { Param } from '../types/param';
import type { ParamOptions } from '../types/param-options';
import { withDescription } from '../with-description';

export const number = (description?: string, options: ParamOptions = {}) => {
  const param: Param = { type: 'number', ...withDescription(description), ...options };
  return param;
};
