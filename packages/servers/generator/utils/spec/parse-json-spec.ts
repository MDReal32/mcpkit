import type { OpenApiDocument } from '../types/open-api-operation.ts';

export const parseJsonSpec = (text: string) => JSON.parse(text) as OpenApiDocument;
