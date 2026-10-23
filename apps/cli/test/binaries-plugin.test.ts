import { describe, expect, it } from 'vitest';
import { mcpkitBinaries, TARGETS } from '../plugins/binaries';

describe('mcpkitBinaries', () => {
  it('runs only in build mode', () => {
    expect(mcpkitBinaries({ version: '0.0.0', targets: ['darwin-arm64'] }).apply).toBe('build');
  });

  it('fails fast on unknown targets and lists the known ones', () => {
    expect(() => mcpkitBinaries({ version: '0.0.0', targets: ['darwin-arm64', 'amiga-m68k'] })).toThrow(
      `unknown target(s): amiga-m68k. Known: ${TARGETS.join(', ')}`,
    );
  });
});
