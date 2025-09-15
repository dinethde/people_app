import { Label } from "@root/components/ui/label";

import * as React from "react";

import { PhoneInput } from "@component/ui/PhoneInput";

// your wrapper shown earlier

type PhoneFieldProps = {
  name: string;
  /** Anything you want to show above the field: text, <label>, a custom header, etc. */
  label?: React.ReactNode;
  /** E.164 value (e.g. "+94712345678") or "" */
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
  disabled?: boolean;
  /** Placeholder for the input */
  placeHolder?: string;
  /** If you don’t pass a semantic <label>, set this for accessibility */
  ariaLabel?: string;
  /** Optional default country for the picker (e.g., "LK") */
  defaultCountry?: import("react-phone-number-input").Country;
};

export function PhoneField({
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  disabled,
  placeHolder = "Enter phone number",
  ariaLabel,
  defaultCountry = "LK",
}: PhoneFieldProps) {
  return (
    <div className="space-y-1">
      {/* Render whatever the caller sends, no wrapper */}
      <Label htmlFor={name}>{label}</Label>

      <PhoneInput
        id={name}
        name={name}
        placeholder={placeHolder}
        defaultCountry={defaultCountry}
        international
        value={value || undefined} // undefined while typing is OK
        onChange={(v) => onChange((v ?? "") as string)}
        onBlur={onBlur}
        disabled={disabled}
        autoComplete="tel"
        aria-label={ariaLabel} // keeps it accessible when no <label htmlFor=...> is provided
      />

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
