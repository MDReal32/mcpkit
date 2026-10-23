import type { Manifest } from '../../manifest';
import type { ResolvedAuth } from './resolved-auth';

export interface AuthResolution {
  auth: ResolvedAuth;
  /** The manifest to send with, its `{domain}` filled in. */
  manifest: Manifest;
  /** Saves what the user entered; runs only once the API accepted the auth. */
  commit?: () => Promise<void>;
}
