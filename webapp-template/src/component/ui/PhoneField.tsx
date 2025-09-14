//
import { Input } from "@root/components/ui/input";
import { Label } from "@root/components/ui/label";

interface PhoneFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
  disabled?: boolean;
  type?: string;
  required?: string;
  placeHolder?: string;
}

export function PhoneField(props: PhoneFieldProps) {
  const {
    name,
    label,
    value,
    onChange,
    onBlur,
    error,
    disabled,
    placeHolder = "+94 89 432 2345",
  } = props;

  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type="tel"
        inputMode="tel"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeHolder}
        required
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
