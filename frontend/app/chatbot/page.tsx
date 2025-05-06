import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconArrowUp, IconSidebar } from "@/lib/icons";

function ChatBot() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      {/* Main Chat Area */}
      <div className="flex flex-grow flex-col">
        <div className="flex-grow overflow-y-auto p-4">
          <div className="mb-4 text-right">
            <div className="inline-block rounded-lg bg-secondary p-2 text-sm text-secondary-foreground">
              Hi, I have a legal question.
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-border bg-card p-4">
          <div className="flex">
            <Input
              type="text"
              placeholder="Send a message..."
              className="mr-2 flex-grow rounded-lg border border-border bg-input p-2 text-foreground"
            />
            <button className="rounded-lg bg-primary p-1 text-primary-foreground">
              <IconArrowUp className="h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="flex w-64 flex-col border-r bg-card p-4 text-card-foreground">
      <div className="item relative flex items-center">
        <button className="absolute rounded p-1">
          <IconSidebar className="h-5 w-5 text-muted-foreground" />
        </button>
        <div className="w-full text-center font-medium">VakilSahab.ai</div>
      </div>

      <div className="mt-4">
        <Button className="w-full">New Chat</Button>
      </div>
    </div>
  );
}

export default ChatBot;
