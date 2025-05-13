"use client";

import React, { useCallback, useId, useRef, useState } from "react";

interface UploadFilesProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  files: File[];
  setFiles: (files: File[]) => void;
  accept?: React.InputHTMLAttributes<HTMLInputElement>["accept"];
  children: React.ReactNode;
}

const UploadFiles = ({
  files,
  setFiles,
  accept = ".pdf",
  children,
  ...restProps
}: UploadFilesProps) => {
  const id = useId();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  }, []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = event.target.files;
      if (selectedFiles && selectedFiles.length > 0) {
        const newFiles = Array.from(selectedFiles);
        setFiles([...files, ...newFiles]);
      }
      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }
    },
    [files, setFiles],
  );

  const handleRemove = useCallback(
    (indexToRemove: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      const newFiles = files.filter((_, index) => index !== indexToRemove);
      setFiles(newFiles);
    },
    [files, setFiles],
  );

  return (
    <button {...restProps} onClick={handleClick}>
      <div className="h-0 w-0 overflow-hidden">
        <input
          id={id}
          ref={inputFileRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          multiple
        />
      </div>
      {children}
    </button>
  );
};

export default UploadFiles;
