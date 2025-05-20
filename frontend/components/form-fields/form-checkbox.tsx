"use client";

import { Check as IconCheck } from "lucide-react";
import { Control, FieldValues, Path, useController } from "react-hook-form";

import { cn } from "@/lib/utils";

interface FormCheckBoxProps<T extends FieldValues>
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  label: string;
  control: Control<T>;
  registerName: Path<T>;
}

export function FormCheckBox<T extends FieldValues>({
  label,
  control,
  registerName,
  ...restProps
}: FormCheckBoxProps<T>) {
  const {
    field: { value: isChecked, onChange },
  } = useController({ control, name: registerName });

  return (
    <button
      type="button"
      className={cn(
        "flex select-none items-center gap-2 rounded-full py-1 disabled:cursor-not-allowed disabled:opacity-50",
      )}
      {...restProps}
      onClick={() => onChange(!isChecked)}
    >
      <span
        className={cn(
          "block h-4 w-4 rounded-full border border-border transition-colors",
          isChecked && "border-0",
        )}
      >
        {isChecked && <IconCheck className="h-4 w-4 text-primary" />}
      </span>
      <span className="text-sm">{label}</span>
    </button>
  );
}
