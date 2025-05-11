"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import { useAppContext } from "@/contexts/app-provider";
import { IconSidebar } from "@/lib/icons";
import { cn } from "@/lib/utils";

import ChatsContainer from "../_components/chat-container";
import InputContainer from "../_components/input-container";
import Sidebar from "../_components/sidebar";

function ChatBot() {
  const [input, setInput] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const chatId = useParams<{ id: string }>().id;
  const { chats, handleQuery, fetchChat } = useAppContext();

  const chat = useMemo(
    () => chats.find((chat) => chat.id === chatId),
    [chats, chatId],
  );

  useEffect(() => {
    if (chatId && !chat) {
      setIsChatLoading(true);
      fetchChat(chatId).then(() => setIsChatLoading(false));
    }
  }, [chatId, chat, fetchChat]);

  return (
    <div className="flex h-screen bg-background">
      <button
        type="button"
        className="fixed left-3 top-4 rounded-lg p-1 hover:bg-secondary/80"
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        <IconSidebar className="h-5 w-5 text-muted-foreground" />
      </button>

      <div
        className={cn(
          "w-64 flex-shrink-0 transition-all",
          !showSidebar && "-ml-64",
        )}
      >
        <Sidebar />
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-grow flex-col">
        <ChatsContainer
          messages={chat ? chat.messages : []}
          isStreaming={chat ? chat.isStreaming : false}
          showLoadingSkelton={!chat || isChatLoading}
        />

        <InputContainer
          inputValue={input}
          onInputChange={(value) => setInput(value)}
          onSubmit={() => {
            setInput("");
            handleQuery(chatId, input);
          }}
          disableSubmit={(chat ? chat.isStreaming : false) || !input.trim()}
        />
      </div>
    </div>
  );
}

export default ChatBot;
