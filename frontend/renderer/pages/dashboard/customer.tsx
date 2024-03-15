import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function CustomerPage() {
  return (
    <React.Fragment>
      <Head>
        <title>Pharm Zeal - Customer</title>
      </Head>
      <div className='grid grid-col-1 text-2xl w-full text-center pt-8'>
        <h1>Customer Page</h1>
      </div>
      <div className='mt-1 w-full flex-wrap flex justify-center gap-6'>
        <Link href='/dashboard/home'>
          <a className='btn-blue'>Go to home page</a>
        </Link>
      </div>
    </React.Fragment>
  );
}
