import { ServerEvent } from "@/types";

export async function fetchSSE(
  url: string,
  config: RequestInit,
  onParse?: (parsedData: ServerEvent) => void,
  onFinish?: () => void,
): Promise<void> {
  const response = await fetch(url, config);

  if (response.ok) {
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let streamData = "";

    if (reader) {
      while (!done) {
        // Read each chunk of the stream
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        // Convert the chunk to text
        streamData += decoder.decode(value, { stream: true });

        // If a complete message is detected, handle the event
        let messages = streamData.split("\n\n");

        for (const message of messages.slice(0, -1)) {
          try {
            const parsedMessage = JSON.parse(message) as ServerEvent;
            onParse?.(parsedMessage);
          } catch (error) {
            console.error("Error parsing SSE message:", error);
          }
        }

        // Keep any leftover data for the next iteration
        streamData = messages[messages.length - 1];
      }
      onFinish?.();
    }
  } else {
    console.error("Error:", response.statusText);
  }
}
