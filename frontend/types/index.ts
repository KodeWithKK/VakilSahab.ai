export * from "./api-response";
export * from "./query-sse";
export * from "./user";

export interface UserMessage {
  id: string;
  type: "user";
  content: string;
  files: Array<{ filename: string; content_type: string }>;
  createdAt: string;
}

export interface AIResponseMessage {
  id: string;
  type: "ai";
  content: string;
}

export interface Chat {
  id: string;
  messages: Array<UserMessage | AIResponseMessage>;
  isStreaming: boolean;
}

export interface ChatInfo {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
