import { ServerEvent } from "@/types";

export async function fetchSSE(
  url: string,
  config: RequestInit,
  onParse?: (parsedData: ServerEvent) => void,
  onFinish?: () => void,
): Promise<void> {
  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      console.error("Error:", response.statusText);
      return;
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let streamData = "";

    if (reader) {
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        streamData += decoder.decode(value, { stream: true });

        const messages = streamData.split("\n\n");

        for (const message of messages.slice(0, -1)) {
          try {
            const parsedMessage = JSON.parse(message) as ServerEvent;
            onParse?.(parsedMessage);
          } catch (error) {
            console.error("Error parsing SSE message:", error);
          }
        }

        streamData = messages[messages.length - 1];
      }

      onFinish?.();
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
