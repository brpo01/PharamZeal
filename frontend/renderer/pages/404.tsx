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
      <div className='mt-1 w-full flex-wrap flex justify-center'>
        <Link href='/dashboard/home'>
          <Button>Go to home page</Button>
        </Link>
      </div>
    </React.Fragment>
  );
}
