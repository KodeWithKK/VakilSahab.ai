"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { produce } from "immer";

import { ApiResponse, Chat, ChatInfo, UserMessage } from "@/types";

import useHandleQuery from "./use-handle-query";

interface IChatbotContext {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  chats: Chat[];
  chatInfos: ChatInfo[];
  isChatsInfoLoading: boolean;
  skeltonQuery: string;
  skeltonFiles: UserMessage["files"];
  showSkelton: boolean;
  handleQuery: () => Promise<void>;
  fetchChat: (chatId: string) => Promise<void>;
  deleteChat: (chatId: string) => Promise<void>;
}

const ChatbotContext = createContext<IChatbotContext | null>(null);

export const useChatbotContext = () => {
  return useContext(ChatbotContext) as IChatbotContext;
};

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

function ChatbotProvider({ children }: { children: React.ReactNode }) {
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [chatInfos, setChatInfos] = useState<ChatInfo[]>([]);
  const [isChatsInfoLoading, setIsChatsInfoLoading] = useState(false);
  const [skeltonQuery, setSkeltonQuery] = useState("");
  const [skeltonFiles, setSkeltonFiles] = useState<UserMessage["files"]>([]);
  const [showSkelton, setShowSkelton] = useState(false);

  const { isSignedIn, getToken } = useAuth();

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

  const { handleQuery } = useHandleQuery({
    input,
    setInput,
    files,
    setFiles,
    setChats,
    setShowSkelton,
    setChatInfos,
    setSkeltonQuery,
    setSkeltonFiles,
  });

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
        })
        .catch((err) => console.log(err.message));
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
    <ChatbotContext.Provider
      value={{
        input,
        setInput,
        files,
        setFiles,
        chats,
        handleQuery,
        chatInfos,
        isChatsInfoLoading,
        skeltonQuery,
        skeltonFiles,
        showSkelton,
        fetchChat,
        deleteChat,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
}

export default ChatbotProvider;
