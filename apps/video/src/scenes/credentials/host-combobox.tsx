import { Caret } from "../../components/caret";
import { COLORS } from "../../const";
import { typedText } from "../../motion/typed-text";
import { useEntrance } from "../../motion/use-entrance";
import { useSeconds } from "../../motion/use-seconds";
import { MONO } from "../../typography/fonts";
import { DOMAIN_QUERY, FIELD_HEIGHT, FORM_TIMELINE, SAVED_HOSTS } from "./const";
import { FormField } from "./form-field";
import { HostMatch } from "./host-match";

/** The domain field: typing narrows the saved hosts, and the first one gets picked. */
export const HostCombobox = () => {
  const seconds = useSeconds();
  const open = useEntrance(FORM_TIMELINE.listOpen, { damping: 200, stiffness: 220 });
  const close = useEntrance(FORM_TIMELINE.pickHost + 0.12, { damping: 200, stiffness: 220 });
  const picked = seconds >= FORM_TIMELINE.pickHost;
  const focused = seconds >= FORM_TIMELINE.clickDomain && seconds < FORM_TIMELINE.clickToken;
  const text = picked
    ? (SAVED_HOSTS[0] ?? "")
    : typedText(DOMAIN_QUERY, seconds, FORM_TIMELINE.typeDomain.start, FORM_TIMELINE.typeDomain.end);
  const listReveal = Math.min(open, 1 - close);
  return (
    <FormField label="Domain" focused={focused}>
      <span style={{ fontFamily: MONO, fontSize: 24, color: COLORS.text }}>{text}</span>
      {focused ? <Caret height={28} solid={!picked} /> : null}
      <svg width={22} height={22} viewBox="0 0 24 24" style={{ marginLeft: "auto" }} aria-hidden="true">
        <path d="M 6 9 L 12 15 L 18 9" fill="none" stroke={COLORS.muted} strokeWidth={2} strokeLinecap="round" />
      </svg>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: FIELD_HEIGHT + 8,
          zIndex: 2,
          padding: 8,
          borderRadius: 12,
          border: `1px solid ${COLORS.borderStrong}`,
          background: COLORS.surfaceRaised,
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.6)",
          clipPath: `inset(0px 0px ${(1 - listReveal) * 100}% 0px round 12px)`,
          display: listReveal > 0.01 ? "block" : "none",
        }}
      >
        {SAVED_HOSTS.map((host, index) => (
          <div
            key={host}
            style={{
              fontFamily: MONO,
              fontSize: 22,
              padding: "14px 16px",
              borderRadius: 8,
              color: index === 0 ? COLORS.text : COLORS.muted,
              background: index === 0 ? COLORS.accentSoft : "transparent",
            }}
          >
            <HostMatch host={host} query={DOMAIN_QUERY} />
          </div>
        ))}
      </div>
    </FormField>
  );
};
