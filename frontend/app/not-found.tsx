import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className='w-full flex justify-center items-center min-h-screen bg-background'>
      <div className='text-center'>
        <h1 className='text-center text-4xl font-bold mb-8'>
          We can't find the page you're looking for.
        </h1>
        <Link href='/admin'>
          <Button>Go to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
