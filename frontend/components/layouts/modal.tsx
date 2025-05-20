"use client";

import { motion } from "motion/react";
import ReactFocusLock from "react-focus-lock";
import { RemoveScroll as ReactRemoveScroll } from "react-remove-scroll";

import { IconClose } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  showModal: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ showModal, onClose, children, className }: ModalProps) {
  if (!showModal) return null;

  return (
    <ReactRemoveScroll>
      <ReactFocusLock returnFocus={true}>
        <div className="scroller fixed left-0 top-0 z-[100] grid h-screen w-full place-items-center overflow-y-auto p-6 backdrop-blur-md">
          <motion.div
            animate={{ scale: [0.75, 1], opacity: [0.75, 1] }}
            className={cn(
              "relative mx-auto max-h-fit w-full max-w-md rounded-lg border bg-background p-6",
              className,
            )}
          >
            <button className="group absolute right-3 top-3" onClick={onClose}>
              <IconClose className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground" />
            </button>
            {children}
          </motion.div>
        </div>
      </ReactFocusLock>
    </ReactRemoveScroll>
  );
}

export default Modal;
