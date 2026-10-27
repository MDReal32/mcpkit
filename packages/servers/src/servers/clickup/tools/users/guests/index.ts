import { usersGuestsAddGuestToFolder } from "./add-guest-to-folder";
import { usersGuestsAddGuestToList } from "./add-guest-to-list";
import { usersGuestsAddGuestToTask } from "./add-guest-to-task";
import { usersGuestsEditGuestOnWorkspace } from "./edit-guest-on-workspace";
import { usersGuestsGetGuest } from "./get-guest";
import { usersGuestsInviteGuestToWorkspace } from "./invite-guest-to-workspace";
import { usersGuestsRemoveGuestFromFolder } from "./remove-guest-from-folder";
import { usersGuestsRemoveGuestFromList } from "./remove-guest-from-list";
import { usersGuestsRemoveGuestFromTask } from "./remove-guest-from-task";
import { usersGuestsRemoveGuestFromWorkspace } from "./remove-guest-from-workspace";

export const usersGuestsTools = [
  usersGuestsAddGuestToFolder,
  usersGuestsAddGuestToList,
  usersGuestsAddGuestToTask,
  usersGuestsEditGuestOnWorkspace,
  usersGuestsGetGuest,
  usersGuestsInviteGuestToWorkspace,
  usersGuestsRemoveGuestFromFolder,
  usersGuestsRemoveGuestFromList,
  usersGuestsRemoveGuestFromTask,
  usersGuestsRemoveGuestFromWorkspace,
];
