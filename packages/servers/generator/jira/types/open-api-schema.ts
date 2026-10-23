export interface OpenApiSchema {
  $ref?: string;
  type?: string | string[];
  description?: string;
  default?: unknown;
  enum?: unknown[];
  items?: OpenApiSchema;
  properties?: Record<string, OpenApiSchema>;
  required?: string[];
  allOf?: OpenApiSchema[];
  oneOf?: OpenApiSchema[];
  anyOf?: OpenApiSchema[];
}
