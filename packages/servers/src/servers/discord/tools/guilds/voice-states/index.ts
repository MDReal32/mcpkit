import { guildsVoiceStatesGetSelfVoiceState } from "./get-self-voice-state";
import { guildsVoiceStatesGetVoiceState } from "./get-voice-state";
import { guildsVoiceStatesUpdateSelfVoiceState } from "./update-self-voice-state";
import { guildsVoiceStatesUpdateVoiceState } from "./update-voice-state";

export const guildsVoiceStatesTools = [
  guildsVoiceStatesGetSelfVoiceState,
  guildsVoiceStatesGetVoiceState,
  guildsVoiceStatesUpdateSelfVoiceState,
  guildsVoiceStatesUpdateVoiceState,
];
