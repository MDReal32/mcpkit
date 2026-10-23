import { stat } from 'node:fs/promises';
import { isMissingFileError } from '@mcpkit/core';

export const readFileMode = async (path: string) => {
  try {
    return (await stat(path)).mode;
  } catch (error) {
    if (isMissingFileError(error)) {
      return undefined;
    }
    throw error;
  }
};
