import { findTomlTable } from './find-toml-table';
import { toTomlTableKey } from './to-toml-table-key';

export const hasTomlTable = (text: string, serversPath: readonly string[], name: string) =>
  findTomlTable(text.split('\n'), toTomlTableKey(serversPath, name), false) !== undefined;
