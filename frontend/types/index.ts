export * from "./api-response";
export * from "./query-sse";
export * from "./user";

export interface Chat {
  id: string;
  messages: {
    type: "user" | "ai";
    message: string;
  }[];
  isStreaming: boolean;
}

export interface ChatInfo {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
