import { ForwardedRef, forwardRef, useId } from "react";

import { Input } from "@/components/ui/input";

interface FormInputProps extends React.ComponentProps<typeof Input> {
  label?: string;
  error?: string;
}

export const FormInput = forwardRef(
  (
    { label, error, ...restProps }: FormInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const id = useId();

    return (
      <div className="w-full space-y-1">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium">
            {label}
          </label>
        )}
        <Input
          id={id}
          className="rounded border p-2"
          {...restProps}
          ref={ref}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

FormInput.displayName = "FormInput";
