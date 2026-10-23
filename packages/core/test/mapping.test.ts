import { describe, expect, it } from 'vitest';
import { getPath, mapResponse } from '../src/main';

describe('mapping', () => {
  it('reads nested paths and maps arrays with []', () => {
    const data = { user: { login: 'ann' }, labels: [{ name: 'bug' }, { name: 'ui' }] };

    expect(getPath(data, 'user.login')).toBe('ann');
    expect(getPath(data, 'labels[].name')).toEqual(['bug', 'ui']);
    expect(getPath(data, 'missing.deep')).toBeUndefined();
  });

  it('applies root and fields to lists, filling missing fields with null', () => {
    const data = { data: [{ id: 1, user: { login: 'ann' } }, { id: 2 }] };

    const mapped = mapResponse(data, { root: 'data', fields: { id: 'id', author: 'user.login' } });

    expect(mapped).toEqual([
      { id: 1, author: 'ann' },
      { id: 2, author: null },
    ]);
  });

  it('returns data untouched without a response spec', () => {
    expect(mapResponse({ a: 1 })).toEqual({ a: 1 });
  });
});
