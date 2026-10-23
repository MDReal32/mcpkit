import { JSON_CONTENT_TYPE } from '../../utils/const.ts';
import { pickType } from '../../utils/schema/pick-type.ts';
import type { OpenApiOperation } from '../../utils/types/open-api-operation.ts';

const isSuccessStatus = (status: string) => status.startsWith('2');

export const returnsArray = (spec: OpenApiOperation) =>
  Object.entries(spec.responses ?? {})
    .filter(([status]) => isSuccessStatus(status))
    .some(([, response]) => {
      const schema = response.content?.[JSON_CONTENT_TYPE]?.schema;
      return schema !== undefined && pickType(schema) === 'array';
    });
