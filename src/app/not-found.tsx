import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PackageX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 md:px-6">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="bg-muted p-6 rounded-full mb-6">
          <PackageX className="h-16 w-16 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          404 - Not Found
        </h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    </div>
  );
}
