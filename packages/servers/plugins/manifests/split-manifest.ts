import { createHash } from 'node:crypto';
import type { Manifest } from '@usemcpkit/core';
import { TOOL_NAME_SEPARATOR } from './const';
import type { ManifestPartFile } from './types/manifest-part-file';
import type { SplitManifest } from './types/split-manifest';

const MIN_SEGMENTS_TO_SPLIT = 3;

const sha256Of = (text: string) => createHash('sha256').update(text).digest('hex');

const toJson = (value: unknown) => `${JSON.stringify(value, null, 2)}\n`;

const isSplittable = ({ tools }: Manifest) =>
  tools.length > 0 && tools.every((tool) => tool.name.split(TOOL_NAME_SEPARATOR).length >= MIN_SEGMENTS_TO_SPLIT);

const groupByFirstSegment = ({ tools }: Manifest) => {
  const groups = new Map<string, Manifest['tools']>();
  for (const tool of tools) {
    const [group = ''] = tool.name.split(TOOL_NAME_SEPARATOR);
    groups.set(group, [...(groups.get(group) ?? []), tool]);
  }
  return groups;
};

/**
 * A server whose tools are all named `<group>:<resource>:<action>` is shipped as a shell (the manifest without tools,
 * listing its parts with their checksums) plus one `<name>/<group>.json` per group, so a client downloads only the
 * groups it calls.
 */
export const splitManifest = (manifest: Manifest) => {
  if (!isSplittable(manifest)) {
    return undefined;
  }
  const files: ManifestPartFile[] = [];
  const parts = [...groupByFirstSegment(manifest)].map(([name, tools]) => {
    const json = toJson({ tools });
    const path = `${manifest.category}/${manifest.name}/${name}.json`;
    files.push({ path, json });
    return { name, path, sha256: sha256Of(json) };
  });
  const { tools: _tools, ...shell } = manifest;
  const split: SplitManifest = { shellJson: toJson({ ...shell, parts }), files };
  return split;
};
