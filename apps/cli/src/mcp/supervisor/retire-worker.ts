import { RETIRED_WORKER_GRACE_MS } from "./const";
import type { Worker } from "./types/worker";

/** Lets `worker` finish the requests it already has, then ends it; it is killed after the grace period. */
export const retireWorker = (worker: Worker, retired: Set<Worker>) => {
  retired.add(worker);
  worker.finish();
  const timer = setTimeout(worker.kill, RETIRED_WORKER_GRACE_MS);
  timer.unref();
  void worker.exited.then(() => {
    clearTimeout(timer);
    retired.delete(worker);
  });
};
