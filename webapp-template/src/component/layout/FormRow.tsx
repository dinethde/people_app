// layout/FormRow.tsx
export function FormRow({
  cols = 2,
  border = "border-b border-st-border-light",
  space = "pb-5",
  children,
}: {
  cols?: 1 | 2 | 3 | 4;
  border?: string;
  space?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`grid gap-6 mt-3 ${space} ${border}`}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {children}
    </div>
  );
}
