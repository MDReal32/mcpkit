import { CheckIcon } from "../../components/check-icon";
import { COLORS } from "../../const";
import { useEntrance } from "../../motion/use-entrance";
import { MONO } from "../../typography/fonts";
import type { ClientRowData } from "./client-row-data";
import { TERMINAL_FONT_SIZE } from "./const";

interface ClientRowProps {
  client: ClientRowData;
  delay: number;
}

export const ClientRow = ({ client, delay }: ClientRowProps) => {
  const appear = useEntrance(delay);
  const check = useEntrance(delay + 0.22, { damping: 200, stiffness: 160 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        height: TERMINAL_FONT_SIZE * 1.75,
        fontFamily: MONO,
        fontSize: TERMINAL_FONT_SIZE,
        opacity: appear,
        translate: `${(1 - appear) * -16}px 0px`,
      }}
    >
      <CheckIcon size={TERMINAL_FONT_SIZE * 1.05} progress={check} />
      <span style={{ color: COLORS.text, width: 250 }}>{client.name}</span>
      <span style={{ color: COLORS.faint, fontSize: TERMINAL_FONT_SIZE * 0.8 }}>{client.configPath}</span>
    </div>
  );
};
