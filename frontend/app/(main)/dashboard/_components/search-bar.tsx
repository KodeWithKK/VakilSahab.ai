import { Input } from "@/components/ui/input";
import { IconFilterSolid, IconSearch } from "@/lib/icons";

function SearchBar() {
  return (
    <div className="relative">
      <div className="absolute py-3 pl-3">
        <IconSearch className="h-5 text-muted-foreground" />
      </div>
      <div className="flex items-center gap-4">
        <Input
          className="w-full rounded-lg py-3 pl-10"
          placeholder="Search by name, specialization, or location..."
        />
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border px-4 py-3 pr-5"
        >
          <IconFilterSolid className="h-5 text-muted-foreground" />
          <span className="text-sm">Filter</span>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
