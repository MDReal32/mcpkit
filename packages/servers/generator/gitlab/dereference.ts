const REF_PREFIX = '#/components/schemas/';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Replaces every `$ref` to a component schema with the schema itself. A reference that points back
 * into the schema being resolved is cut to an empty schema, so recursive entities terminate.
 */
export const createDereferencer = (schemas: Record<string, unknown>) => {
  const resolved = new Map<string, unknown>();
  const resolving = new Set<string>();

  const walk = (node: unknown): unknown => {
    if (Array.isArray(node)) {
      return node.map(walk);
    }
    if (!isRecord(node)) {
      return node;
    }
    const ref = node.$ref;
    if (typeof ref === 'string') {
      return resolveRef(ref);
    }
    return Object.fromEntries(Object.entries(node).map(([key, value]) => [key, walk(value)]));
  };

  const resolveRef = (ref: string): unknown => {
    if (!ref.startsWith(REF_PREFIX)) {
      throw new Error(`unsupported $ref ${ref}`);
    }
    const name = ref.slice(REF_PREFIX.length);
    if (resolving.has(name)) {
      return {};
    }
    if (resolved.has(name)) {
      return resolved.get(name);
    }
    if (!(name in schemas)) {
      throw new Error(`unknown $ref ${ref}`);
    }
    resolving.add(name);
    const result = walk(schemas[name]);
    resolving.delete(name);
    resolved.set(name, result);
    return result;
  };

  return walk;
};
