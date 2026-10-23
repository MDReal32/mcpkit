import type { Operation } from '../../utils/types/operation';

export const findUndeclaredPlaceholder = ({ path, spec }: Operation) => {
  const declared = new Set(
    (spec.parameters ?? []).filter((parameter) => parameter.in === 'path').map(({ name }) => name),
  );
  return [...path.matchAll(/\{([^}]+)\}/g)].map((match) => match[1] ?? '').find((name) => !declared.has(name));
};
