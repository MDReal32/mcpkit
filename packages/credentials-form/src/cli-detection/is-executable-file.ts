import { constants } from 'node:fs';
import { access, stat } from 'node:fs/promises';
import { isJsonObject } from '@usemcpkit/core';
import { PATH_LOOKUP_MISS_CODES } from '../const';

export const isExecutableFile = async (file: string) => {
  try {
    if (!(await stat(file)).isFile()) {
      return false;
    }
    await access(file, constants.X_OK);
    return true;
  } catch (error) {
    if (isJsonObject(error) && typeof error.code === 'string' && PATH_LOOKUP_MISS_CODES.includes(error.code)) {
      return false;
    }
    throw error;
  }
};
