import { Input } from "@root/components/ui/input";
import { Label } from "@root/components/ui/label";

interface TextFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
  disabled?: boolean;
  type?: string;
}

export function TextField({
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  disabled,
  type = "text",
}: TextFieldProps) {
  return (
    <div className="space-y-1">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        disabled={disabled}
        className={
          disabled
            ? [
                "text-st-200",
                "disabled:opacity-100", // cancel dimming
                "disabled:border-0 disabled:shadow-none disabled:bg-transparent",
                "focus-visible:ring-0 focus-visible:border-transparent",
                "disabled:px-0 disabled:py-0 ",
              ].join(" ")
            : "text-st-300 p-m px-3 py-1"
        }
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
