import type { OpenApiParameter } from "../types/open-api-operation";

export const mergeParameters = (shared: OpenApiParameter[], own: OpenApiParameter[]) => [
  ...shared.filter(
    (parameter) => !own.some((candidate) => candidate.name === parameter.name && candidate.in === parameter.in),
  ),
  ...own,
];
