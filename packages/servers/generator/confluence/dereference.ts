import { isRecord } from './is-record.ts';
import { resolveReference } from './resolve-reference.ts';

/**
 * Inlines every local `$ref`. A reference that points back into the chain being resolved becomes an empty
 * schema, which keeps recursive schemas finite; resolved references are shared, not copied.
 */
export const dereference = (root: unknown) => {
  const resolved = new Map<string, unknown>();

  const walk = (node: unknown, chain: readonly string[]): unknown => {
    if (Array.isArray(node)) {
      return node.map((item) => walk(item, chain));
    }
    if (!isRecord(node)) {
      return node;
    }
    const reference = node.$ref;
    if (typeof reference === 'string') {
      return walkReference(reference, chain);
    }
    return Object.fromEntries(Object.entries(node).map(([key, value]) => [key, walk(value, chain)]));
  };

  const walkReference = (reference: string, chain: readonly string[]) => {
    if (chain.includes(reference)) {
      return {};
    }
    if (!resolved.has(reference)) {
      resolved.set(reference, walk(resolveReference(root, reference), [...chain, reference]));
    }
    return resolved.get(reference);
  };

  return walk(root, []);
};
