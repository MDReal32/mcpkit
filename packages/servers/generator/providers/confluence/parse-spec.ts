import { dereference } from '../../utils/spec/dereference.ts';
import type { OpenApiDocument } from '../../utils/types/open-api-operation.ts';

export const parseSpec = (text: string) => dereference(JSON.parse(text)) as OpenApiDocument;
