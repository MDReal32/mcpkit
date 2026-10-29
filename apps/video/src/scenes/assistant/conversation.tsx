import { SANS } from "../../typography/fonts";
import {
  ANSWER_TEXT,
  APP_COLORS,
  APP_WINDOW,
  CHAT_TIMELINE,
  COLUMN_LEFT,
  FOLLOW_UP_TEXT,
  INTRO_TEXT,
  PULL_REQUESTS,
  TOOL_CALLS,
} from "./const";
import { PullRequestRow } from "./pull-request-row";
import { StreamedText } from "./streamed-text";
import { ToolCallRow } from "./tool-call-row";
import { UserMessage } from "./user-message";

const replyStyle = { fontFamily: SANS, fontSize: 21, lineHeight: 1.5, color: APP_COLORS.text } as const;

export const Conversation = () => (
  <div
    style={{
      position: "absolute",
      left: COLUMN_LEFT,
      top: APP_WINDOW.titleBar + 30,
      width: APP_WINDOW.column,
      display: "flex",
      flexDirection: "column",
      gap: 14,
    }}
  >
    <UserMessage />
    <StreamedText
      text={INTRO_TEXT}
      start={CHAT_TIMELINE.intro.start}
      end={CHAT_TIMELINE.intro.end}
      style={{ ...replyStyle, marginTop: 10 }}
    />
    {TOOL_CALLS.map((call) => (
      <ToolCallRow key={call.name} call={call} />
    ))}
    <StreamedText
      text={ANSWER_TEXT}
      start={CHAT_TIMELINE.answer.start}
      end={CHAT_TIMELINE.answer.end}
      style={{ ...replyStyle, marginTop: 6 }}
    />
    <div>
      {PULL_REQUESTS.map((pull, index) => (
        <PullRequestRow key={pull.number} pull={pull} delay={CHAT_TIMELINE.pulls + index * CHAT_TIMELINE.pullStep} />
      ))}
    </div>
    <StreamedText
      text={FOLLOW_UP_TEXT}
      start={CHAT_TIMELINE.followUp.start}
      end={CHAT_TIMELINE.followUp.end}
      style={{ ...replyStyle, color: APP_COLORS.muted }}
    />
  </div>
);
