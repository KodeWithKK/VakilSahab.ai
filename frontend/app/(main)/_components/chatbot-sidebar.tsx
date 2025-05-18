"use client";

import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useChatbotContext } from "@/contexts/chatbot-provider";
import { IconDelete, IconLoader } from "@/lib/icons";
import { cn } from "@/lib/utils";

function ChatbotSidebar() {
  const { chatInfos, isChatsInfoLoading, deleteChat } = useChatbotContext();

  const chatId = useParams<{ id: string }>().id;
  const router = useRouter();

  return (
    <div className="">
      <Button className="w-full" onClick={() => router.push("/chatbot")}>
        New Chat
      </Button>

      <div className="py-4">
        {chatInfos.length > 0 && (
          <div className="flex flex-col">
            {chatInfos.map((chat) => (
              <div
                key={`chat-${chat.id}`}
                role="button"
                className={cn(
                  "group flex items-center gap-1 overflow-hidden rounded-lg p-2",
                  chatId === chat.id
                    ? "bg-secondary/50"
                    : "hover:bg-secondary/30",
                )}
                onClick={() => router.push(`/chatbot/${chat.id}`)}
              >
                <div className="w-[100%] text-left transition-all duration-200 group-hover:w-[calc(100%-24px)]">
                  <p className="truncate text-sm">{chat.name}</p>
                </div>
                <button
                  type="button"
                  className="invisible flex-shrink-0 group-hover:visible"
                  onClick={() => {
                    if (chat.id === chatId) {
                      router.push("/chatbot");
                    }

                    deleteChat(chat.id);
                  }}
                >
                  <IconDelete className="h-5 hover:text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}

        {isChatsInfoLoading && (
          <div className="flex justify-center py-6">
            <div className="inline-flex animate-spin duration-700">
              <IconLoader className="h-6" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatbotSidebar;
