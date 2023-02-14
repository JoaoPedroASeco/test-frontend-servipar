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
}: ThemeInputType) => {
  return (
    <ThemeinputContainer className="theme-input">
      {label && <label htmlFor={id}>{label}:</label>}
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
      {error && <span className="input-error">{error}</span>}
    </ThemeinputContainer>
  );
};
