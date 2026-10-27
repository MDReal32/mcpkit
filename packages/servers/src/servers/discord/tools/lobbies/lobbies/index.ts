import { lobbiesLobbiesCreateLobby } from "./create-lobby";
import { lobbiesLobbiesCreateOrJoinLobby } from "./create-or-join-lobby";
import { lobbiesLobbiesDeleteLobby } from "./delete-lobby";
import { lobbiesLobbiesEditLobby } from "./edit-lobby";
import { lobbiesLobbiesGetLobby } from "./get-lobby";

export const lobbiesLobbiesTools = [
  lobbiesLobbiesCreateLobby,
  lobbiesLobbiesCreateOrJoinLobby,
  lobbiesLobbiesDeleteLobby,
  lobbiesLobbiesEditLobby,
  lobbiesLobbiesGetLobby,
];
