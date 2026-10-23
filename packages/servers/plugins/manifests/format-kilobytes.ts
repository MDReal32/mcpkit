import { BYTES_PER_KILOBYTE } from "./const";

export const formatKilobytes = (text: string) => `${(Buffer.byteLength(text) / BYTES_PER_KILOBYTE).toFixed(2)} kB`;
