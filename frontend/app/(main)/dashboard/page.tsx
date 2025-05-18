import { Button } from "@/components/ui/button";
import { IconCall, IconLawyerSolid, IconMail } from "@/lib/icons";

import SearchBar from "./_components/search-bar";
import { dummyLawyersData, popularCategories } from "./constant";

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
            <IconLawyerSolid className="h-5" />
            <span>Register as Lawyer</span>
          </Button>
        </div>
      </div>
      <SearchBar />

      <div className="space-y-4">
        <h3 className="font-medium">Popular Categories</h3>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(132px,1fr))] gap-4">
          {popularCategories.map(({ Icon, ...category }) => (
            <button
              key={category.name}
              type="button"
              className="flex flex-col items-center gap-2 rounded-lg border bg-secondary/20 p-3 transition-colors hover:bg-secondary/40"
            >
              <div className="rounded-full bg-secondary p-2.5">
                <Icon className="h-6 w-6" />
              </div>
              <p className="text-sm">{category.name}</p>
              <p className="text-xs text-muted-foreground">
                {category.tags.join(", ")}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Top Lawyers Near You</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dummyLawyersData.map((lawyer) => (
            <div
              key={`lawyer-${lawyer.id}`}
              className="flex select-none flex-col space-y-4 rounded-lg border p-3 text-left align-top hover:bg-secondary/20"
            >
              <div className="flex gap-4">
                <img src={lawyer.photo} className="h-16" alt="lawyer" />
                <div className="space-y-2">
                  <p className="font-bold">
                    {lawyer.firstName} {lawyer.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {lawyer.specialization}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {lawyer.tags.map((tag) => (
                      <span
                        key={`tag-${lawyer.id}-${tag}`}
                        className="rounded-full bg-secondary/60 p-1 px-2 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">{lawyer.bio}</p>

              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm text-muted-foreground">
                    Consultation Fee
                  </span>
                  <span className="font-medium">
                    {lawyer.fees == 0
                      ? "Free Consultation"
                      : `₹ ${lawyer.fees} / hour`}
                  </span>
                </div>

                <div className="space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full bg-transparent"
                  >
                    <IconCall className="h-5" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full bg-transparent"
                  >
                    <IconMail className="h-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="text-center">
        <Button variant={"outline"} size={"lg"} className="rounded-lg">
          Load More
        </Button>
      </div> */}
    </div>
  );
}

export default Dashboard;
