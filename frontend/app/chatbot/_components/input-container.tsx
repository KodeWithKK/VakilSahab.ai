"use client";

import { useRef } from "react";

import TextArea from "@/components/ui/text-area";
import { IconArrowUp, IconAttach } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface InputContainerProps {
  onSubmit: () => void;
  inputValue: string;
  onInputChange: (value: string) => void;
  disableSubmit?: boolean;
}

function InputContainer({
  onSubmit,
  inputValue,
  onInputChange,
  disableSubmit,
}: InputContainerProps) {
  const btnSubmit = useRef<HTMLButtonElement>(null);

  return (
    <div className="mx-auto w-[70%] rounded-t-xl border bg-secondary/20 p-2 pb-0">
      <div className="space-y-1.5 rounded-t-lg border border-b-0 bg-secondary/60 p-2">
        <TextArea
          maxHeight={100}
          value={inputValue}
          placeholder="Type your message here..."
          className="rounded-b-none border-0 p-1"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              btnSubmit.current?.click();
            }
          }}
          onChange={(e) => onInputChange(e.target.value)}
        />
        <div className="flex justify-between">
          <button
            type="button"
            className="flex items-center gap-1 rounded-2xl border px-3 py-1"
          >
            <IconAttach className="h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Attach</span>
          </button>
          <button
            ref={btnSubmit}
            type="button"
            className={cn(
              "rounded-full bg-foreground p-1 text-primary-foreground",
              disableSubmit && "bg-foreground/50",
            )}
            onClick={onSubmit}
            disabled={disableSubmit}
          >
            <IconArrowUp className="h-6 text-background" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default InputContainer;
