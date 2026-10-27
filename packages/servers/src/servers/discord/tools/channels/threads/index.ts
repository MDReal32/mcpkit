import { channelsThreadsCreateThread } from "./create-thread";
import { channelsThreadsListMyPrivateArchivedThreads } from "./list-my-private-archived-threads";
import { channelsThreadsListPrivateArchivedThreads } from "./list-private-archived-threads";
import { channelsThreadsListPublicArchivedThreads } from "./list-public-archived-threads";
import { channelsThreadsThreadSearch } from "./thread-search";

export const channelsThreadsTools = [
  channelsThreadsCreateThread,
  channelsThreadsListMyPrivateArchivedThreads,
  channelsThreadsListPrivateArchivedThreads,
  channelsThreadsListPublicArchivedThreads,
  channelsThreadsThreadSearch,
];
