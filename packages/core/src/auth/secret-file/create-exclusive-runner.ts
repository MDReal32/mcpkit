/** Runs tasks one at a time, so read-modify-write cycles on one file never lose each other's changes. */
export const createExclusiveRunner = () => {
  let pending: Promise<unknown> = Promise.resolve();
  return <T>(task: () => Promise<T>) => {
    const run = pending.then(task);
    pending = run.catch(() => undefined);
    return run;
  };
};
