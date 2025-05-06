import Link from "next/link";

import { IconBot } from "@/lib/icons";

function Dashboard() {
  return (
    <div className="p-6">
      <h3 className="text-lg font-bold">Dashboard</h3>
      <p className="text-muted-foreground">View All our Vakils</p>
      <Link
        href="/chatbot"
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full bg-primary p-2 transition-all hover:bg-primary/90"
      >
        <IconBot className="h-8 text-foreground" />
      </Link>
    </div>
  );
}

export default Dashboard;
