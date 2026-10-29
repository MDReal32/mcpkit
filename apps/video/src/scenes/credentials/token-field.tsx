import { Caret } from "../../components/caret";
import { COLORS } from "../../const";
import { typedText } from "../../motion/typed-text";
import { useSeconds } from "../../motion/use-seconds";
import { MONO } from "../../typography/fonts";
import { FORM_TIMELINE, TOKEN_LENGTH } from "./const";
import { FormField } from "./form-field";

export const TokenField = () => {
  const seconds = useSeconds();
  const { start, end } = FORM_TIMELINE.typeToken;
  const focused = seconds >= FORM_TIMELINE.clickToken && seconds < FORM_TIMELINE.press;
  return (
    <FormField label="Access token" focused={focused}>
      <span style={{ fontFamily: MONO, fontSize: 24, color: COLORS.text, letterSpacing: "0.08em" }}>
        {typedText("•".repeat(TOKEN_LENGTH), seconds, start, end)}
      </span>
      {focused ? <Caret height={28} solid={seconds < end} /> : null}
    </FormField>
  );
};
