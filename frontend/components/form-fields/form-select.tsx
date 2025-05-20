import {
  Control,
  FieldValues,
  Form,
  Path,
  useController,
} from "react-hook-form";

import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface FormSelectProps<T extends FieldValues> {
  label?: string;
  defaultValue?: string;
  options?: Record<string, string>;
  control: Control<T>;
  registerName: Path<T>;
  placeholder?: string;
  className?: string;
}

export function FormSelect<T extends FieldValues>({
  label,
  placeholder,
  options,
  defaultValue,
  control,
  registerName,
  className,
}: FormSelectProps<T>) {
  const {
    field: { value, onChange },
  } = useController({ control, name: registerName });

  return (
    <div className={cn("space-y-1", className)}>
      {label && <span className="block text-sm font-medium">{label}</span>}

      <Select
        defaultValue={defaultValue}
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger className="w-full gap-2">
          <SelectValue placeholder={placeholder || "Select Option"} />
        </SelectTrigger>
        <SelectContent className="z-[100]">
          {options &&
            Object.entries(options).map(([value, label]) => (
              <SelectItem key={JSON.stringify([value, label])} value={value}>
                {label}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}

FormSelect.displayName = "FormSelect";
