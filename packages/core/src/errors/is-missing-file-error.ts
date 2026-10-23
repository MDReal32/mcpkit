export const isMissingFileError = (error: unknown) =>
  error instanceof Error && "code" in error && error.code === "ENOENT";
