import { IconBrand } from "@/lib/icons";

function BrandLogo() {
  return (
    <div className="flex items-center gap-2">
      <IconBrand className="h-6 w-6 text-primary" />
      <h3 className="font-medium">
        <span>VakilSahab</span>
        <span className="text-primary">.ai</span>
      </h3>
    </div>
  );
}

export default BrandLogo;
