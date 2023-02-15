import { CSSProperties } from "@stitches/react";
import { ReactNode } from "react";
import { ThemeinputContainer } from "./styles";

type ThemeInputType = {
  label?: string;
  id: string;
  type?: string;
  name: string;
  value?: string | number | any;
  onChange?: (_: any) => void;
  placeholder?: string;
  error?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export const ThemeInput = ({
  type = "text",
  id,
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  style,
  children,
}: ThemeInputType) => {
  return (
    <ThemeinputContainer className="theme-input" style={{ ...style }}>
      {label && <label htmlFor={id}>{label}:</label>}

      {type != "select" && (
        <input
          style={{ border: `${error ? "2px solid #FD5E5E" : ""}` }}
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="off"
        />
      )}

      {type === "select" && (
        <select
          style={{ ...style }}
          name={name}
          id={id}
          defaultValue={0}
          onChange={onChange}
          value={value}
        >
          <option value={0}>Escolha uma opção</option>
          {children}
        </select>
      )}

      {error && <span className="input-error">{error}</span>}
    </ThemeinputContainer>
  );
};
