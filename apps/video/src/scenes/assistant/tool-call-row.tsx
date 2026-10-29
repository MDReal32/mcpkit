import { CheckIcon } from "../../components/check-icon";
import { LogoMark } from "../../components/logo-mark";
import { Spinner } from "../../components/spinner";
import type { ToolCallColors } from "../../components/tool-call-colors";
import { useEntrance } from "../../motion/use-entrance";
import { useSeconds } from "../../motion/use-seconds";
import { MONO, SANS } from "../../typography/fonts";
import { APP_COLORS } from "./const";
import type { ToolCallData } from "./tool-call-data";

interface ToolCallRowProps {
  call: ToolCallData;
  colors?: ToolCallColors;
  fontSize?: number;
}

/** One MCP tool call as a chat client shows it: running, then done with its result. */
export const ToolCallRow = ({ call, colors = APP_COLORS, fontSize = 18 }: ToolCallRowProps) => {
  const seconds = useSeconds();
  const appear = useEntrance(call.start);
  const check = useEntrance(call.done, { damping: 200, stiffness: 160 });
  const done = seconds >= call.done;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        height: fontSize * 2.3,
        padding: "0 14px",
        borderRadius: 10,
        border: `1px solid ${colors.border}`,
        opacity: appear,
        translate: `0px ${(1 - appear) * 12}px`,
      }}
    >
      <LogoMark size={fontSize + 2} />
      <span style={{ fontFamily: MONO, fontSize, color: colors.text }}>{call.name}</span>
      <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            fontFamily: SANS,
            fontSize: fontSize * 0.9,
            color: colors.muted,
            opacity: check,
            whiteSpace: "nowrap",
          }}
        >
          {call.result}
        </span>
        {done ? <CheckIcon size={fontSize + 4} progress={check} /> : <Spinner size={fontSize} color={colors.faint} />}
      </span>
    </div>
  );
};
