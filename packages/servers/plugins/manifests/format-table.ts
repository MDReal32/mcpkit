export const formatTable = (rows: readonly (readonly string[])[]) => {
  const columnCount = Math.max(0, ...rows.map((row) => row.length));
  const widths = Array.from({ length: columnCount }, (_, column) =>
    Math.max(...rows.map((row) => row[column]?.length ?? 0)),
  );
  return rows.map((row) => `  ${row.map((cell, column) => cell.padEnd(widths[column] ?? 0)).join("  ")}`);
};
