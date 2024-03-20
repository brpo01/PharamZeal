import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "antd";

export default function NextPage() {
  return (
    <React.Fragment>
      <Head>
        <title>Pharm Zeal - 404 page </title>
      </Head>
      <div className='w-full flex justify-center items-center min-h-screen bg-[#F8ED81]'>
        <div className='text-center'>
          <h1 className='text-center text-6xl font-bold'>
            Sorry...we can't find the page you're looking for.
          </h1>
          <Link href='/dashboard/home'>
            <Button>Go to home page</Button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
