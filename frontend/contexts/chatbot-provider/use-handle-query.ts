import { useCallback } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { produce } from "immer";
import { v4 as uuid } from "uuid";

import { fetchSSE } from "@/lib/fetch-sse";
import { Chat, ChatInfo, UserMessage } from "@/types";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface UseHandleQueryProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setShowSkelton: (show: boolean) => void;
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  setChatInfos: React.Dispatch<React.SetStateAction<ChatInfo[]>>;
  setSkeltonQuery: React.Dispatch<React.SetStateAction<string>>;
  setSkeltonFiles: React.Dispatch<React.SetStateAction<UserMessage["files"]>>;
}

function useHandleQuery({
  input,
  setInput,
  files,
  setFiles,
  setChats,
  setShowSkelton,
  setChatInfos,
  setSkeltonQuery,
  setSkeltonFiles,
}: UseHandleQueryProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { getToken } = useAuth();
  const chatId = useParams<{ id: string }>().id;

  const handleQuery = useCallback(async () => {
    const query = input.trim();

    const formData = new FormData();
    formData.append("query", query);

    const filesMetadata = files.map((file) => ({
      filename: file.name,
      content_type: file.type,
    }));

    if (files.length > 0) {
      for (const file of files) {
        formData.append("files", file);
      }
    }

    if (pathname === "/chatbot") {
      setShowSkelton(true);
      setSkeltonQuery(query);
      setSkeltonFiles(filesMetadata);
    }

    if (chatId) {
      formData.append("session_id", chatId);
      setChats(
        produce((draft) => {
          const chat = draft.find((chat) => chat.id === validChatId);
          if (!chat) return;
          chat.messages.push({
            id: uuid(),
            type: "user",
            content: query,
            createdAt: new Date().toISOString(),
            files: filesMetadata,
          });
          chat.messages.push({
            id: uuid(),
            type: "ai",
            content: "",
          });
          chat.isStreaming = true;
        }),
      );
    }

    setInput("");
    setFiles([]);

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
                  {
                    id: uuid(),
                    type: "user",
                    content: query,
                    createdAt: new Date().toISOString(),
                    files: filesMetadata,
                  },
                  { id: uuid(), type: "ai", content: "" },
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
              chat.messages[chat.messages.length - 1].content +=
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
        setSkeltonQuery("");
        setSkeltonFiles([]);
      },
    );
  }, [
    router,
    pathname,
    input,
    files,
    chatId,
    getToken,
    setChats,
    setShowSkelton,
    setChatInfos,
    setSkeltonQuery,
  ]);

  return { handleQuery };
}

export default useHandleQuery;
