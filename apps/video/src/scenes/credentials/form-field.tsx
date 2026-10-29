import type { ReactNode } from "react";
import { COLORS } from "../../const";
import { SANS } from "../../typography/fonts";
import { FIELD_HEIGHT } from "./const";

interface FormFieldProps {
  label: string;
  focused: boolean;
  children: ReactNode;
}

export const FormField = ({ label, focused, children }: FormFieldProps) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
    <div style={{ fontFamily: SANS, fontSize: 20, fontWeight: 500, color: COLORS.text }}>{label}</div>
    <div
      style={{
        height: FIELD_HEIGHT,
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        borderRadius: 12,
        border: `1px solid ${focused ? COLORS.accent : COLORS.borderStrong}`,
        boxShadow: focused ? "0 0 0 4px rgba(107, 140, 255, 0.16)" : "none",
        background: COLORS.background,
        position: "relative",
      }}
    >
      {children}
    </div>
  </div>
);
