import type { ClientSelection } from './client-selection';

export interface InstallOptions extends ClientSelection {
  binary?: string;
}
