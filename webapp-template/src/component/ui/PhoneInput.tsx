"use client";

import { Button } from "@root/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@root/components/ui/command";
import { Input } from "@root/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@root/components/ui/popover";
import { ScrollArea } from "@root/components/ui/scroll-area";
import { cn } from "@root/lib/utils";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import PhoneNumberInput, {
  type Country,
  type FlagProps,
  type Value as PhoneValue,
  getCountryCallingCode,
} from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import * as React from "react";

type BaseInputProps = Omit<React.ComponentProps<"input">, "value" | "onChange" | "ref">;

type PhoneInputProps = BaseInputProps & {
  value?: PhoneValue; // E.164 string or undefined while typing
  onChange?: (val: PhoneValue) => void;
  defaultCountry?: Country; // e.g., "LK"
  international?: boolean; // true to force +XX formatting
  countries?: Country[]; // optional whitelist
  disabled?: boolean;
};

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, value, onChange, disabled, ...props }, ref) => {
    return (
      <PhoneNumberInput
        ref={ref as any}
        className={cn("flex", className)}
        flagComponent={Flag}
        countrySelectComponent={CountrySelect}
        inputComponent={TextInput}
        smartCaret={false}
        value={value}
        onChange={(v) => onChange?.(v ?? "")}
        disabled={disabled}
        {...props}
      />
    );
  },
);
PhoneInput.displayName = "PhoneInput";

/** Right-hand text input (shadcn) */
const TextInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => (
    <Input ref={ref} className={cn("rounded-e-lg rounded-s-none", className)} {...props} />
  ),
);
TextInput.displayName = "TextInput";

/** Left country picker (shadcn Popover + Command) */
type CountryEntry = { label: string; value: Country | undefined };
type CountrySelectProps = {
  value: Country;
  onChange: (country: Country) => void;
  options: CountryEntry[];
  disabled?: boolean;
};

const CountrySelect = ({
  value: selectedCountry,
  onChange,
  options,
  disabled,
}: CountrySelectProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="flex gap-1 rounded-e-none rounded-s-lg border-r-0 px-3 focus:z-10"
          disabled={disabled}
          aria-label="Select country"
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <Flag country={selectedCountry} countryName={selectedCountry} />
          <ChevronsUpDown className={cn("-mr-2 size-4", disabled ? "hidden" : "opacity-50")} />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          {/* Uncontrolled; Command filters items by text automatically */}
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <ScrollArea className="h-72">
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {options.map(({ value, label }) =>
                  value ? (
                    <CountryRow
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry}
                      onPick={(c) => {
                        onChange(c);
                        setOpen(false);
                      }}
                    />
                  ) : null,
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const CountryRow = React.memo(function CountryRow({
  country,
  countryName,
  selectedCountry,
  onPick,
}: {
  country: Country;
  countryName: string;
  selectedCountry: Country;
  onPick: (c: Country) => void;
}) {
  return (
    <CommandItem className="gap-2" onSelect={() => onPick(country)}>
      <Flag country={country} countryName={countryName} />
      <span className="flex-1 text-sm">{countryName}</span>
      <span className="text-sm text-foreground/50">{`+${getCountryCallingCode(country)}`}</span>
      <CheckIcon
        className={cn("ml-auto size-4", country === selectedCountry ? "opacity-100" : "opacity-0")}
      />
    </CommandItem>
  );
});

/** Flag SVGs from the library (kept tiny and styled by us) */
const Flag = ({ country, countryName }: FlagProps) => {
  const Svg = flags[country];
  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20 [&_svg:not([class*='size-'])]:size-full">
      {Svg && <Svg title={countryName} />}
    </span>
  );
};
