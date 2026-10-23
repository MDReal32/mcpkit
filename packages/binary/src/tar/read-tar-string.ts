import type { TarField } from '../types/tar-field';

export const readTarString = (header: Uint8Array, field: TarField) => {
  const bytes = header.subarray(field.offset, field.offset + field.length);
  const end = bytes.indexOf(0);
  return new TextDecoder().decode(end === -1 ? bytes : bytes.subarray(0, end));
};
