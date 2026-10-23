import { readFile } from 'node:fs/promises';

export const loadSpecText = async (url: string, localPath: string | undefined) => {
  if (localPath) {
    return readFile(localPath, 'utf8');
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`GET ${url} failed: ${response.status}`);
  }
  return response.text();
};
