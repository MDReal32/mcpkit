import type { Manifest } from '@usemcpkit/core';
import type { ManifestPart } from './manifest-part';

export interface WholeManifestFile {
  manifest: Manifest;
}

/** The manifest without its tools, which live in the parts. */
export interface ManifestShellFile {
  shell: Record<string, unknown>;
  parts: readonly ManifestPart[];
}

export type ManifestFile = WholeManifestFile | ManifestShellFile;
