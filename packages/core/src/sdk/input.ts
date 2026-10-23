import type { InputSchema } from '../manifest';
import { isRequiredParam } from './is-required-param';
import { stripOptionalMarker } from './strip-optional-marker';
import type { ParamMap } from './types/param-map';

/** Builds an object input schema; `required` is derived from the params. */
export const input = (params: ParamMap = {}) => {
  const entries = Object.entries(params);
  const required = entries.filter(([, param]) => isRequiredParam(param)).map(([name]) => name);
  const properties = Object.fromEntries(entries.map(([name, param]) => [name, stripOptionalMarker(param)]));
  const schema: InputSchema = { type: 'object', properties, ...(required.length > 0 ? { required } : {}) };
  return schema;
};
