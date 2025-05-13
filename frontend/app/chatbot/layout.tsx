import ChatbotProvider from "@/contexts/chatbot-provider";

function ChatbotLayout({ children }: { children: React.ReactNode }) {
  return <ChatbotProvider>{children}</ChatbotProvider>;
}

export default ChatbotLayout;
