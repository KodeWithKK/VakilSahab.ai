"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { produce } from "immer";

import { fetchSSE } from "@/lib/fetch-sse";
import { ApiResponse, Chat, ChatInfo } from "@/types";

interface IAppContext {
  chats: Chat[];
  chatInfos: ChatInfo[];
  isChatsInfoLoading: boolean;
  showSkelton: boolean;
  handleQuery: (chatId: string | null, message: string) => Promise<void>;
  fetchChat: (chatId: string) => Promise<void>;
  deleteChat: (chatId: string) => Promise<void>;
}

const AppContext = createContext<IAppContext | null>(null);

export const useAppContext = () => {
  return useContext(AppContext) as IAppContext;
};

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

function AppProvider({ children }: { children: React.ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [chatInfos, setChatInfos] = useState<ChatInfo[]>([]);
  const [isChatsInfoLoading, setIsChatsInfoLoading] = useState(false);
  const [showSkelton, setShowSkelton] = useState(false);

  const router = useRouter();
  const { isSignedIn, getToken } = useAuth();
  const pathname = usePathname();
  useEffect(() => {
    if (isSignedIn) {
      (async () => {
        setIsChatsInfoLoading(true);
        axios
          .get<ApiResponse<ChatInfo[]>>(
            `${BACKEND_BASE_URL}/api/session/list`,
            {
              headers: { Authorization: `Bearer ${await getToken()}` },
            },
          )
          .then((res) => res.data.data)
          .then((data) => setChatInfos(data))
          .finally(() => setIsChatsInfoLoading(false));
      })();
    }
  }, [isSignedIn]);

  const handleQuery = useCallback(
    async (chatId: string | null, query: string) => {
      if (pathname === "/chatbot") {
        setShowSkelton(true);
      }

      const formData = new FormData();
      formData.append("query", query);

      if (chatId) {
        formData.append("session_id", chatId);
        setChats(
          produce((draft) => {
            const chat = draft.find((chat) => chat.id === validChatId);
            if (!chat) return;
            chat.messages.push({ type: "user", message: query });
            chat.messages.push({ type: "ai", message: "" });
            chat.isStreaming = true;
          }),
        );
      }

      let validChatId: string | null = chatId;

      fetchSSE(
        `${BACKEND_BASE_URL}/api/query`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${await getToken()}` },
          body: formData,
        },
        (parsedData) => {
          if (parsedData.event === "new-session-info") {
            const chatId = parsedData.data.id;
            validChatId = chatId;
            setChats(
              produce((draft) => {
                draft.push({
                  id: chatId,
                  messages: [
                    { type: "user", message: query },
                    { type: "ai", message: "" },
                  ],
                  isStreaming: true,
                });
              }),
            );
            setChatInfos(
              produce((draft) => {
                draft.unshift(parsedData.data);
              }),
            );
            router.push(`/chatbot/${chatId}`);
          }

          if (parsedData.event === "next-chunk") {
            setChats(
              produce((draft) => {
                const chat = draft.find((chat) => chat.id === validChatId);
                if (!chat) return;
                chat.messages[chat.messages.length - 1].message +=
                  parsedData.data;
              }),
            );
          }
        },
        () => {
          setChats(
            produce((draft) => {
              const chat = draft.find((chat) => chat.id === validChatId);
              if (!chat) return;
              chat.isStreaming = false;
            }),
          );
          setShowSkelton(false);
        },
      );
    },
    [router],
  );

  const fetchChat = useCallback(
    async (chatId: string) => {
      const exisingChat = chats.find((chat) => chat.id === chatId);
      if (exisingChat) return;

      axios
        .get<ApiResponse<Chat["messages"]>>(
          `${BACKEND_BASE_URL}/api/session/history/${chatId}`,
          {
            headers: { Authorization: `Bearer ${await getToken()}` },
          },
        )
        .then((res) => res.data.data)
        .then((data) => {
          setChats(
            produce((draft) => {
              draft.push({
                id: chatId,
                messages: data,
                isStreaming: false,
              });
            }),
          );
        });
    },
    [chats],
  );

  const deleteChat = useCallback(async (chatId: string) => {
    setChats(
      produce((draft) => {
        const index = draft.findIndex((chat) => chat.id === chatId);
        draft.splice(index, 1);
      }),
    );
    setChatInfos(
      produce((draft) => {
        const index = draft.findIndex((chat) => chat.id === chatId);
        draft.splice(index, 1);
      }),
    );

    await axios.delete(`${BACKEND_BASE_URL}/api/session/${chatId}`, {
      headers: { Authorization: `Bearer ${await getToken()}` },
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        chats,
        handleQuery,
        chatInfos,
        isChatsInfoLoading,
        showSkelton,
        fetchChat,
        deleteChat,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
