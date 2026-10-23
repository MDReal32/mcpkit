import type { JsonSchema } from '../../manifest';
import type { Param } from '../types/param';
import { withDescription } from '../with-description';

export const array = (items: JsonSchema, description?: string) => {
  const param: Param = { type: 'array', items, ...withDescription(description) };
  return param;
};
