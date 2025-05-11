import { ChatInfo } from ".";

interface EventNewSessionInfo {
  event: "new-session-info";
  data: ChatInfo;
}

interface EventNextChunk {
  event: "next-chunk";
  data: string;
}

export type ServerEvent = EventNewSessionInfo | EventNextChunk;
