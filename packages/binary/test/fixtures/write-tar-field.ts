export const writeTarField = (header: Uint8Array, offset: number, value: string) => {
  header.set(new TextEncoder().encode(value), offset);
};
