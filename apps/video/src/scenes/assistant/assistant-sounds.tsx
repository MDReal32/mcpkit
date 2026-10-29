import { popSound } from "../../audio/pop-sound";
import { Sfx } from "../../audio/sfx";
import { CHAT_TIMELINE, PULL_REQUESTS, TOOL_CALLS } from "./const";

export const AssistantSounds = () => (
  <>
    <Sfx sound="click" at={CHAT_TIMELINE.send} volume={0.55} />
    {TOOL_CALLS.map((call, index) => (
      <Sfx key={call.name} sound={popSound(index + 2)} at={call.done} volume={0.26} />
    ))}
    {PULL_REQUESTS.map((pull, index) => (
      <Sfx
        key={pull.number}
        sound={popSound(index)}
        at={CHAT_TIMELINE.pulls + index * CHAT_TIMELINE.pullStep}
        volume={0.14}
      />
    ))}
  </>
);
