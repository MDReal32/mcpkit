import { readFile } from 'node:fs/promises';
import { isMissingFileError } from '../../errors';

export const readTokensText = async (file: string) => {
  try {
    return await readFile(file, 'utf8');
  } catch (error) {
    if (isMissingFileError(error)) {
      return undefined;
    }
    throw error;
  }
};
