/** Turns the data of version N into version N+1; its place in the list is N - 1, so the first entry upgrades version 1. */
export type Migration = (data: Readonly<Record<string, unknown>>) => Record<string, unknown>;
