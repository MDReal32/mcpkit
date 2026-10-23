import { autoUpdateBinary, createBinaryContext } from '@mcpkit/binary';
import { VERSION } from '../../version';
import { printError } from '../output/print-error';

export const runAutoUpdate = async () => {
  const result = await autoUpdateBinary(await createBinaryContext(), VERSION);
  if (result?.status === 'updated') {
    printError(`mcpkit: updated ${result.from} -> ${result.to}; reloading the server now`);
  }
};
