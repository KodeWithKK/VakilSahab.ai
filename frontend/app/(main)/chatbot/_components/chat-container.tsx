import { Fragment } from "react";
import { useUser } from "@clerk/nextjs";

import MarkdownRenderer from "@/components/features/markdown-render";
import { IconFile, IconLoader } from "@/lib/icons";
import { Chat } from "@/types";

interface ChatContainerProps {
  messages: Chat["messages"];
  isStreaming: boolean;
  showLoadingSkelton?: boolean;
}

function ChatsContainer({
  messages,
  isStreaming,
  showLoadingSkelton = false,
}: ChatContainerProps) {
  const { user } = useUser();

  return (
    <div className="mx-auto flex w-[95%] flex-col overflow-y-auto py-5 md:w-[70%]">
      <div className="flex flex-col gap-2">
        {!showLoadingSkelton &&
          messages.map((message) => (
            <Fragment key={message.id}>
              {message.type === "user" && (
                <div className="ml-auto max-w-[70%] space-y-1.5">
                  <div>
                    {message.files.map((file, index) => (
                      <div
                        key={`${file.filename}-${index}`}
                        className="relative flex items-center gap-2 rounded-lg border p-1 pr-4"
                      >
                        <div className="flex-shrink-0 rounded-md bg-pink-500 p-2">
                          <IconFile className="h-5" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="max-w-36 truncate text-sm">
                            {file.filename}
                          </p>
                          <p className="text-xs text-muted-foreground">PDF</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-lg bg-secondary px-3 py-2 text-sm text-secondary-foreground">
                    <MarkdownRenderer markdown={message.content} />
                  </div>
                </div>
              )}
              {message.type === "ai" && (
                <div className="w-full space-y-2 rounded-lg p-2 text-sm text-secondary-foreground">
                  <MarkdownRenderer markdown={message.content} />
                </div>
              )}
            </Fragment>
          ))}
      </div>

      {!showLoadingSkelton && messages.length === 0 && (
        <div className="grid place-items-center pt-[calc(50vh-113px)]">
          <h2 className="text-center text-2xl font-semibold">
            Hello, {user?.firstName}
          </h2>
        </div>
      )}

      {(showLoadingSkelton || isStreaming) && (
        <div className="flex justify-center py-6">
          <div className="animate-spin duration-700">
            <IconLoader className="h-7 w-7" />
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatsContainer;
