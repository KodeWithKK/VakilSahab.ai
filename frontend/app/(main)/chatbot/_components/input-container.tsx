"use client";

import { useCallback, useRef } from "react";

import UploadFiles from "@/components/features/upload-files";
import TextArea from "@/components/ui/text-area";
import { formatFileSize } from "@/lib/format-string";
import {
  IconArrowUp,
  IconAttach,
  IconClose,
  IconFile,
  IconMic,
} from "@/lib/icons";
import { cn } from "@/lib/utils";

interface InputContainerProps {
  files: File[];
  setFiles: (files: File[]) => void;
  onSubmit: () => void;
  inputValue: string;
  onInputChange: (value: string) => void;
  disableSubmit?: boolean;
}

function InputContainer({
  files,
  setFiles,
  onSubmit,
  inputValue,
  onInputChange,
  disableSubmit,
}: InputContainerProps) {
  const btnSubmit = useRef<HTMLButtonElement>(null);

  const handleRemove = useCallback(
    (indexToRemove: number) => {
      const newFiles = files.filter((_, index) => index !== indexToRemove);
      setFiles(newFiles);
    },
    [files, setFiles],
  );

  return (
    <div className="mx-auto w-[70%] rounded-t-xl border bg-secondary/20 p-2 pb-0">
      <div className="space-y-1.5 rounded-t-lg border border-b-0 bg-secondary/60 p-2">
        <DisplayFiles files={files} handleRemove={handleRemove} />
        <TextArea
          maxHeight={100}
          value={inputValue}
          placeholder="Type your message here..."
          className="rounded-b-none border-0 p-1"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              btnSubmit.current?.click();
            }
          }}
          onChange={(e) => {
            onInputChange(e.currentTarget.value);
          }}
        />
        <div className="flex justify-between">
          <UploadFiles
            files={files}
            setFiles={setFiles}
            className="flex items-center gap-1 rounded-2xl border px-3 py-1"
          >
            <IconAttach className="h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Attach</span>
          </UploadFiles>
          <div className="flex gap-2">
            <button
              type="button"
              className={cn(
                "grid h-8 w-8 place-items-center rounded-full border text-primary-foreground",
                disableSubmit && "",
              )}
            >
              <IconMic className="h-5 text-muted-foreground" />
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
    </div>
  );
}

interface DisplayFilesProps {
  files: File[];
  handleRemove: (indexToRemove: number) => void;
}

function DisplayFiles({ files, handleRemove }: DisplayFilesProps) {
  return (
    <div className="flex flex-wrap gap-1">
      {files.map((file, index) => (
        <div
          key={file.name}
          className="relative flex items-center gap-2 rounded-lg border p-1 pr-4"
        >
          <div className="flex-shrink-0 rounded-md bg-pink-500 p-2">
            <IconFile className="h-5" />
          </div>
          <div className="space-y-0.5">
            <p className="max-w-36 truncate text-sm">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              PDF | {formatFileSize(file.size, 0)}
            </p>
          </div>
          <button
            type="button"
            className="absolute right-0 top-0 grid -translate-y-1/4 translate-x-1/4 place-items-center rounded-full bg-foreground p-px"
            onClick={() => handleRemove(index)}
          >
            <IconClose className="h-3 text-background" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default InputContainer;
