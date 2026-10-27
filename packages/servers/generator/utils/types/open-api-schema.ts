export interface OpenApiSchema {
  $ref?: string;
  type?: string | string[];
  description?: string;
  format?: string;
  /** OpenAPI 3.1 marks an uploaded file with `contentEncoding: binary` instead of `format: binary`. */
  contentEncoding?: string;
  default?: unknown;
  enum?: unknown[];
  items?: OpenApiSchema;
  properties?: Record<string, OpenApiSchema>;
  required?: string[];
  allOf?: OpenApiSchema[];
  oneOf?: OpenApiSchema[];
  anyOf?: OpenApiSchema[];
}
