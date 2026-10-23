import type { OpenApiOperation } from "../../../utils/types/open-api-operation";

export interface GithubOpenApiOperation extends OpenApiOperation {
  "x-github"?: { category?: string };
}
