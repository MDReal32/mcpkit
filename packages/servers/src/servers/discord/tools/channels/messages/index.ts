import { channelsMessagesAddMyMessageReaction } from "./add-my-message-reaction";
import { channelsMessagesBulkDeleteMessages } from "./bulk-delete-messages";
import { channelsMessagesCreateMessage } from "./create-message";
import { channelsMessagesCreatePin } from "./create-pin";
import { channelsMessagesCreateThreadFromMessage } from "./create-thread-from-message";
import { channelsMessagesCrosspostMessage } from "./crosspost-message";
import { channelsMessagesDeleteAllMessageReactions } from "./delete-all-message-reactions";
import { channelsMessagesDeleteAllMessageReactionsByEmoji } from "./delete-all-message-reactions-by-emoji";
import { channelsMessagesDeleteMessage } from "./delete-message";
import { channelsMessagesDeleteMyMessageReaction } from "./delete-my-message-reaction";
import { channelsMessagesDeletePin } from "./delete-pin";
import { channelsMessagesDeleteUserMessageReaction } from "./delete-user-message-reaction";
import { channelsMessagesGetMessage } from "./get-message";
import { channelsMessagesListMessageReactionsByEmoji } from "./list-message-reactions-by-emoji";
import { channelsMessagesListMessages } from "./list-messages";
import { channelsMessagesListPins } from "./list-pins";
import { channelsMessagesUpdateMessage } from "./update-message";

export const channelsMessagesTools = [
  channelsMessagesAddMyMessageReaction,
  channelsMessagesBulkDeleteMessages,
  channelsMessagesCreateMessage,
  channelsMessagesCreatePin,
  channelsMessagesCreateThreadFromMessage,
  channelsMessagesCrosspostMessage,
  channelsMessagesDeleteAllMessageReactions,
  channelsMessagesDeleteAllMessageReactionsByEmoji,
  channelsMessagesDeleteMessage,
  channelsMessagesDeleteMyMessageReaction,
  channelsMessagesDeletePin,
  channelsMessagesDeleteUserMessageReaction,
  channelsMessagesGetMessage,
  channelsMessagesListMessageReactionsByEmoji,
  channelsMessagesListMessages,
  channelsMessagesListPins,
  channelsMessagesUpdateMessage,
];
