import type { OpenApiSchema } from './open-api-schema.ts';

export interface OpenApiParameter {
  name: string;
  in: string;
  required?: boolean;
  description?: string;
  schema?: OpenApiSchema;
}

export interface OpenApiRequestBody {
  required?: boolean;
  content: Record<string, { schema?: OpenApiSchema }>;
}

export interface OpenApiOperation {
  operationId?: string;
  summary?: string;
  description?: string;
  deprecated?: boolean;
  tags?: string[];
  parameters?: OpenApiParameter[];
  requestBody?: OpenApiRequestBody;
}

export interface OpenApiDocument {
  paths: Record<string, Record<string, OpenApiOperation | OpenApiParameter[] | undefined>>;
  components?: { schemas?: Record<string, OpenApiSchema> };
}
