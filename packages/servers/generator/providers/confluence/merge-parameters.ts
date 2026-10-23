import type { OpenApiParameter } from '../../utils/types/open-api-operation.ts';

export const mergeParameters = (shared: OpenApiParameter[], own: OpenApiParameter[]) => [
  ...shared.filter(
    (parameter) => !own.some((candidate) => candidate.name === parameter.name && candidate.in === parameter.in),
  ),
  ...own,
];
