export interface TomlTableRange {
  /** Index of the `[table]` header line. */
  start: number;
  /** Index of the first line after the table body. */
  end: number;
}
