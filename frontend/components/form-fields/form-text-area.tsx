"use client";

import { forwardRef, useId } from "react";

import TextArea from "../ui/text-area";

interface FormTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxHeight?: number;
  label?: string;
  error?: string;
}

export const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  ({ label, error, maxHeight, ...restProps }, ref) => {
    const id = useId();

    return (
      <div className="space-y-1">
        {label && (
          <label htmlFor={id} className="inline-block text-sm font-medium">
            {label}
          </label>
        )}
        <TextArea id={id} ref={ref} maxHeight={maxHeight} {...restProps} />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

FormTextArea.displayName = "FormTextArea";
