"use client";

import { useAppContext } from "@/contexts/app-provider";
import { useChatbotContext } from "@/contexts/chatbot-provider";
import { cn } from "@/lib/utils";

import ChatsContainer from "./_components/chat-container";
import InputContainer from "./_components/input-container";

function ChatBot() {
  const { showSidebar } = useAppContext();

  const {
    input,
    setInput,
    files,
    setFiles,
    skeltonQuery,
    skeltonFiles,
    showSkelton,
    handleQuery,
  } = useChatbotContext();

  return (
    <>
      <ChatsContainer
        messages={
          showSkelton
            ? [
                {
                  id: "skelton",
                  type: "user",
                  content: skeltonQuery,
                  files: skeltonFiles,
                  createdAt: new Date().toISOString(),
                },
              ]
            : []
        }
        isStreaming={showSkelton}
      />
      <div
        className={cn(
          "fixed bottom-0 left-0 z-10 w-full bg-background pl-64 transition-all",
          !showSidebar && "pl-0",
        )}
      >
        <InputContainer
          files={files}
          setFiles={setFiles}
          inputValue={showSkelton ? "" : input}
          onInputChange={(value) => setInput(value)}
          onSubmit={handleQuery}
          disableSubmit={!input.trim()}
        />
      </div>
    </>
  );
}

export default ChatBot;
