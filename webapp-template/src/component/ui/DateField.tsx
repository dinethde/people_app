//
import { Input } from "@root/components/ui/input";
import { Label } from "@root/components/ui/label";
import { fromYmdString, toYmdString } from "@root/src/utils/utils";

interface Date {
  year: number;
  month: number;
  day: number;
}

type NullableDate = Date | null;

interface DateFieldProps {
  name: string;
  label: string;
  value: NullableDate;
  onChange: (v: Date) => void;
  onBlur: () => void;
  error?: string;
  disabled?: boolean;
  type?: string;
  required?: string;
  placeHolder?: string;
}

export function DateField(props: DateFieldProps) {
  const { name, label, value, onChange, onBlur, error, disabled = true, placeHolder = "-" } = props;

  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      {value && disabled ? (
        <Input
          id={name}
          type="date"
          value={toYmdString(value)}
          onChange={(e) => onChange(console.log(e.target.value))}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={placeHolder}
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
      ) : (
        <Input
          id={name}
          type="text"
          value={"-"}
          onChange={(e) => onChange(fromYmdString(e.currentTarget.value))}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={placeHolder}
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
      )}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
