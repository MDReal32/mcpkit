import { describeError } from '@usemcpkit/core';
import { syncManifests } from '../../registry';
import { printError } from '../output/print-error';

export const syncQuietly = async () => {
  try {
    await syncManifests();
  } catch (error) {
    printError(`mcpkit: manifest sync failed: ${describeError(error)}`);
  }
};
