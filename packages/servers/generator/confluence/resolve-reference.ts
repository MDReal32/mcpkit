const decodePointerSegment = (segment: string) => segment.replaceAll('~1', '/').replaceAll('~0', '~');

export const resolveReference = (root: unknown, reference: string) => {
  if (!reference.startsWith('#/')) {
    throw new Error(`unsupported $ref "${reference}", only local references are resolved`);
  }
  let target = root;
  for (const segment of reference.slice(2).split('/')) {
    const key = decodePointerSegment(segment);
    if (typeof target !== 'object' || target === null || !(key in target)) {
      throw new Error(`$ref "${reference}" does not resolve`);
    }
    target = (target as Record<string, unknown>)[key];
  }
  return target;
};
