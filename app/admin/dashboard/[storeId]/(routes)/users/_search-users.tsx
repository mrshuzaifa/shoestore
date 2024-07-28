"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export const SearchUsers = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div>  
    <form className="max-w-md m-5"
        onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const formData = new FormData(form);
            const queryTerm = formData.get("search") as string;
            router.push(pathname + "?search=" + queryTerm);
        }}
    >  
        <div className="flex items-center py-4">
        <Input
          placeholder="Search"
          className="max-w-56"
          name="search"
        />
            <Button type="submit" className="-ml-14"><Search /></Button>
        </div>
    </form>
    </div>
  );
};