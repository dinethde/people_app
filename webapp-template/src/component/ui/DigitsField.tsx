import { Input } from "@root/components/ui/input";
import { Label } from "@root/components/ui/label";

type Updater<T> = T | ((prev: T) => T);

interface DigitsFieldProps {
  name: string;
  label: string;
  value: number;
  onChange: (v: Updater<number>) => void;
  onBlur: () => void;
  error?: string;
  disabled?: boolean;
  type?: string;
}

export function DigitsField({
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  disabled,
  type = "text",
}: DigitsFieldProps) {
  return (
    <div className="space-y-1">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type={type}
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onChange={(e) => {
          const s = e.currentTarget.value;
          if (s === "") {
            onChange(0); // empty -> null
            return;
          }
          let n = e.currentTarget.valueAsNumber; // number or NaN
          if (Number.isNaN(n)) {
            onChange(0);
            return;
          }
          onChange(n);
        }}
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
