//
import { Input } from "@root/components/ui/input";
import { Label } from "@root/components/ui/label";

interface EmailFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
  disabled?: boolean;
  required?: string;
  placeHolder?: string;
}

export function EmailField(props: EmailFieldProps) {
  const { name, label, value, onChange, onBlur, error, disabled, placeHolder = "-" } = props;

  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type="email"
        inputMode="email"
        value={value ? value : "-"}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeHolder}
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
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
