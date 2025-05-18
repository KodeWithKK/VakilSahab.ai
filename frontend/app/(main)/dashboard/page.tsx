import { Button } from "@/components/ui/button";
import {
  IconCorporate,
  IconCriminal,
  IconHome,
  IconLawyer,
  IconPersonalInjury,
  IconRealEstate,
  IconTaxLaw,
} from "@/lib/icons";

import SearchBar from "./_components/search-bar";

const popularCategories = [
  {
    name: "Family Law",
    tags: ["Divorce", "Custody"],
    Icon: IconHome,
  },
  {
    name: "Corporate",
    tags: ["Business", "Contracts"],
    Icon: IconCorporate,
  },
  {
    name: "Criminal",
    tags: ["Defense", "Appeals"],
    Icon: IconCriminal,
  },
  {
    name: "Personal Injury",
    tags: ["Accidents", "Malpractice"],
    Icon: IconPersonalInjury,
  },
  {
    name: "Tax Law",
    tags: ["Planning", "Disputes"],
    Icon: IconTaxLaw,
  },
  {
    name: "Real Estate",
    tags: ["Property", "Leasing"],
    Icon: IconRealEstate,
  },
];

function Dashboard() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Find Lawyer</h2>
        <div>
          <Button
            type="button"
            variant={"secondary"}
            className="flex items-center gap-2 rounded-full border bg-secondary/60"
          >
            <IconLawyer className="h-5" />
            <span>Register as Lawyer</span>
          </Button>
        </div>
      </div>
      <SearchBar />

      <div className="space-y-4">
        <h3 className="font-medium">Popular Categories</h3>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(132px,1fr))] gap-4">
          {popularCategories.map(({ Icon, ...category }) => (
            <div
              key={category.name}
              className="flex flex-col items-center gap-2 rounded-lg border bg-secondary/20 p-3"
            >
              <div className="rounded-full bg-secondary p-2.5">
                <Icon className="h-6 w-6" />
              </div>
              <p className="text-sm">{category.name}</p>
              <p className="text-xs text-muted-foreground">
                {category.tags.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Top Lawyers Near You</h3>
      </div>
    </div>
  );
}

export default Dashboard;
