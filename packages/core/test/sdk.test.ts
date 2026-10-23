import { describe, expect, it } from 'vitest';
import { input, number, optional, string } from '../src/main';

describe('input', () => {
  it('derives required from params without optional() or default, and serializes cleanly', () => {
    const schema = input({ a: string('A'), b: optional(string()), c: number('C', { default: 1 }) });

    expect(JSON.parse(JSON.stringify(schema))).toEqual({
      type: 'object',
      properties: {
        a: { type: 'string', description: 'A' },
        b: { type: 'string' },
        c: { type: 'number', description: 'C', default: 1 },
      },
      required: ['a'],
    });
  });

  it('strips the optional marker from properties', () => {
    const schema = input({ b: optional(string()) });

    expect(Object.getOwnPropertySymbols(schema.properties?.b ?? {})).toEqual([]);
    expect(schema.required).toBeUndefined();
  });
});
