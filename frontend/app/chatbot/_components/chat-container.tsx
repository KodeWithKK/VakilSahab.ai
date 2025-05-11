import { Fragment } from "react";
import { useUser } from "@clerk/nextjs";

import MarkdownRenderer from "@/components/features/markdown-render";
import { IconLoader } from "@/lib/icons";
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
    <div className="mx-auto flex w-[70%] flex-grow flex-col overflow-y-auto py-5">
      <div className="flex flex-col gap-2">
        {!showLoadingSkelton &&
          messages.map((message, index) => (
            <Fragment key={`message-${index}`}>
              {message.type === "user" && (
                <div className="ml-auto block rounded-lg bg-secondary px-3 py-2 text-sm text-secondary-foreground">
                  {message.message}
                </div>
              )}
              {message.type === "ai" && (
                <div className="block w-full space-y-2 rounded-lg p-2 text-sm text-secondary-foreground">
                  <MarkdownRenderer markdown={message.message} />
                </div>
              )}
            </Fragment>
          ))}
      </div>

      {!showLoadingSkelton && messages.length === 0 && (
        <div className="grid h-[calc(100vh-113px-32px)] place-items-center py-10">
          <h2 className="-mt-10 text-center text-2xl font-semibold">
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
