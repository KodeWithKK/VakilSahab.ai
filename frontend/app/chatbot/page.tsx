"use client";

import { useState } from "react";

import { useAppContext } from "@/contexts/app-provider";
import { IconSidebar } from "@/lib/icons";
import { cn } from "@/lib/utils";

import ChatsContainer from "./_components/chat-container";
import InputContainer from "./_components/input-container";
import Sidebar from "./_components/sidebar";

function ChatBot() {
  const [input, setInput] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);

  const { showSkelton, handleQuery } = useAppContext();

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
                    type: "user",
                    message: input,
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
          inputValue={showSkelton ? "" : input}
          onInputChange={(value) => setInput(value)}
          onSubmit={async () => {
            await handleQuery(null, input);
          }}
          disableSubmit={showSkelton || !input.trim()}
        />
      </div>
    </div>
  );
}

export default ChatBot;
