import { resolve } from "node:path";

export const isSameFilePath = (left: string, right: string) => resolve(left) === resolve(right);
