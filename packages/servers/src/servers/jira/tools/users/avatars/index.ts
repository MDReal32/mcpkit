import { usersAvatarsDeleteAvatar } from "./delete-avatar";
import { usersAvatarsGetAllSystemAvatars } from "./get-all-system-avatars";
import { usersAvatarsGetAvatarImageById } from "./get-avatar-image-by-id";
import { usersAvatarsGetAvatarImageByOwner } from "./get-avatar-image-by-owner";
import { usersAvatarsGetAvatarImageByType } from "./get-avatar-image-by-type";
import { usersAvatarsGetAvatars } from "./get-avatars";
import { usersAvatarsStoreAvatar } from "./store-avatar";

export const usersAvatarsTools = [
  usersAvatarsDeleteAvatar,
  usersAvatarsGetAllSystemAvatars,
  usersAvatarsGetAvatarImageById,
  usersAvatarsGetAvatarImageByOwner,
  usersAvatarsGetAvatarImageByType,
  usersAvatarsGetAvatars,
  usersAvatarsStoreAvatar,
];
