"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const pathname = usePathname();
  const router = useRouter();

  const reRoute = () => {
    if (pathname.includes("/employee")) {
      router.push("/employee");
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className='w-full flex justify-center items-center min-h-screen bg-background'>
      <div className='text-center'>
        <h1 className='text-center text-4xl font-bold mb-8'>
          We can't find the page you're looking for.
        </h1>
        <Button onClick={reRoute}>Go to Dashboard</Button>
      </div>
    </div>
  );
}
