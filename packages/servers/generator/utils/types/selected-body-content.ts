import type { OpenApiSchema } from "./open-api-schema";

export interface SelectedBodyContent {
  contentType: string;
  schema: OpenApiSchema;
}
