"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/app-provider";
import { IconDelete, IconLoader } from "@/lib/icons";
import { cn } from "@/lib/utils";

function Sidebar() {
  const router = useRouter();
  const { chatInfos, isChatsInfoLoading, deleteChat } = useAppContext();

  const chatId = useParams<{ id: string }>().id;

  return (
    <div className="flex h-full w-full flex-col border-r bg-card p-4 text-card-foreground">
      <Link href="/" className="w-full text-center font-medium">
        VakilSahab.ai
      </Link>

      <div className="mt-4">
        <Button className="w-full" onClick={() => router.push("/chatbot")}>
          New Chat
        </Button>
      </div>

      {chatInfos.length > 0 && (
        <div className="flex flex-col py-4">
          {chatInfos.map((chat) => (
            <div
              key={`chat-${chat.id}`}
              className={cn(
                "group flex items-center gap-1 overflow-hidden rounded-lg p-2",
                chatId === chat.id
                  ? "bg-secondary/50"
                  : "hover:bg-secondary/30",
              )}
            >
              <button
                className="w-[100%] text-left transition-all duration-200 group-hover:w-[calc(100%-24px)]"
                onClick={() => router.push(`/chatbot/${chat.id}`)}
              >
                <p className="truncate text-sm">{chat.name}</p>
              </button>
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
  );
}

export default Sidebar;
