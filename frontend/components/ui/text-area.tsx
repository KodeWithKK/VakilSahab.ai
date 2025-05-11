"use client";

import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
} from "react";

import { cn } from "@/lib/utils";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxHeight?: number;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ maxHeight = 200, className, ...restProps }, ref) => {
    const id = useId();
    const localRef = useRef<HTMLTextAreaElement | null>(null);

    // Merge the forwarded ref with local ref
    useImperativeHandle(ref, () => localRef.current as HTMLTextAreaElement, []);

    // Auto height adjustment logic
    useEffect(() => {
      if (localRef.current) {
        localRef.current.style.height = "auto";
        localRef.current.style.height = `${Math.min(
          localRef.current.scrollHeight,
          maxHeight,
        )}px`;
      }
    }, []);

    return (
      <textarea
        id={id}
        ref={localRef}
        className={cn(
          "scroller block w-full resize-none rounded-md border bg-transparent p-2 text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-0",
          className,
        )}
        onInput={(e) => {
          e.currentTarget.style.height = "auto";
          e.currentTarget.style.height = `${Math.min(
            e.currentTarget.scrollHeight,
            maxHeight,
          )}px`;
        }}
        {...restProps}
      />
    );
  },
);

TextArea.displayName = "TextArea";

export default TextArea;
