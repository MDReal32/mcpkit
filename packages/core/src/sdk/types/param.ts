import type { JsonSchema } from '../../manifest';
import type { OPTIONAL_MARKER } from '../const';

export interface Param extends JsonSchema {
  [OPTIONAL_MARKER]?: true;
}
