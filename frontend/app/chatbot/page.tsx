"use client";

import { useState } from "react";

import { useChatbotContext } from "@/contexts/chatbot-provider";
import { IconSidebar } from "@/lib/icons";
import { cn } from "@/lib/utils";

import ChatsContainer from "./_components/chat-container";
import InputContainer from "./_components/input-container";
import Sidebar from "./_components/sidebar";

function ChatBot() {
  const [showSidebar, setShowSidebar] = useState(true);

  const {
    input,
    setInput,
    files,
    setFiles,
    skeltonQuery,
    showSkelton,
    handleQuery,
  } = useChatbotContext();

  return (
    <div className="bg-background">
      <button
        type="button"
        className="fixed left-3 top-4 z-50 rounded-lg p-1 hover:bg-secondary/80"
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        <IconSidebar className="h-5 w-5 text-muted-foreground" />
      </button>

      <div
        className={cn(
          "fixed left-0 top-0 z-20 h-screen w-64 flex-shrink-0 transition-all",
          !showSidebar && "-left-64",
        )}
      >
        <Sidebar />
      </div>

      <div
        className={cn(
          "flex flex-grow flex-col pb-[113px] pl-64 transition-all",
          !showSidebar && "pl-0",
        )}
      >
        <ChatsContainer
          messages={
            showSkelton
              ? [
                  {
                    id: "skelton",
                    type: "user",
                    content: skeltonQuery,
                    files: [],
                    createdAt: new Date().toISOString(),
                  },
                ]
              : []
          }
          isStreaming={showSkelton}
        />
      </div>

      <div
        className={cn(
          "fixed bottom-0 z-10 w-full bg-background pl-64 transition-all",
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
    </div>
  );
}

export default ChatBot;
