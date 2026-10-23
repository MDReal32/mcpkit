import { adminBroadcastMessagesCreateBroadcastMessages } from "./create-broadcast-messages";
import { adminBroadcastMessagesDeleteBroadcastMessages } from "./delete-broadcast-messages";
import { adminBroadcastMessagesGetBroadcastMessages } from "./get-broadcast-messages";
import { adminBroadcastMessagesListBroadcastMessages } from "./list-broadcast-messages";
import { adminBroadcastMessagesUpdateBroadcastMessages } from "./update-broadcast-messages";

export const adminBroadcastMessagesTools = [
  adminBroadcastMessagesCreateBroadcastMessages,
  adminBroadcastMessagesDeleteBroadcastMessages,
  adminBroadcastMessagesGetBroadcastMessages,
  adminBroadcastMessagesListBroadcastMessages,
  adminBroadcastMessagesUpdateBroadcastMessages,
];
