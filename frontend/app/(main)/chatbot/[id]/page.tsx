"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import { useAppContext } from "@/contexts/app-provider";
import { useChatbotContext } from "@/contexts/chatbot-provider";
import { cn } from "@/lib/utils";

import ChatsContainer from "../_components/chat-container";
import InputContainer from "../_components/input-container";

function ChatBot() {
  const [isChatLoading, setIsChatLoading] = useState(false);

  const chatId = useParams<{ id: string }>().id;

  const { showSidebar } = useAppContext();
  const { input, setInput, files, setFiles, chats, handleQuery, fetchChat } =
    useChatbotContext();

  const chat = useMemo(
    () => chats.find((chat) => chat.id === chatId),
    [chats, chatId],
  );

  useEffect(() => {
    if (chatId && !chat && !isChatLoading) {
      setIsChatLoading(true);
      fetchChat(chatId).then(() => setIsChatLoading(false));
    }
  }, [chatId, chat, fetchChat]);

  return (
    <>
      <ChatsContainer
        messages={chat ? chat.messages : []}
        isStreaming={chat ? chat.isStreaming : false}
        showLoadingSkelton={!chat || isChatLoading}
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
          inputValue={input}
          onInputChange={(value) => setInput(value)}
          onSubmit={handleQuery}
          disableSubmit={(chat ? chat.isStreaming : false) || !input.trim()}
        />
      </div>
    </>
  );
}

export default ChatBot;
