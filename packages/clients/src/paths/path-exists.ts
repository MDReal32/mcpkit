import { access } from 'node:fs/promises';
import { isMissingFileError } from '@mcpkit/core';

export const pathExists = async (path: string) => {
  try {
    await access(path);
    return true;
  } catch (error) {
    if (isMissingFileError(error)) {
      return false;
    }
    throw error;
  }
};
