import type { CompiledManifest } from './compiled-manifest';

export interface CompileResult {
  compiled: readonly CompiledManifest[];
  errors: readonly string[];
  dependencies: readonly string[];
}
