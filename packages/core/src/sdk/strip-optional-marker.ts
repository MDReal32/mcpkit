import type { JsonSchema } from '../manifest';
import { OPTIONAL_MARKER } from './const';
import type { Param } from './types/param';

export const stripOptionalMarker = (param: Param) => {
  const { [OPTIONAL_MARKER]: _marker, ...rest } = param;
  const schema: JsonSchema = rest;
  return schema;
};
