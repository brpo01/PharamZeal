import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <React.Fragment>
      <Head>
        <title>Pharm Zeal</title>
      </Head>
      <div className='grid grid-col-1 text-2xl w-full text-center pt-8'>
        <h1>Welcome to Pharma Zeal</h1>
      </div>
      <div className='mt-1 w-full flex-wrap flex justify-center gap-6'>
        <Link href='/next'>
          <a className='btn-blue'>Go to next page</a>
        </Link>
        <Link href='/login'>
          <a className='btn-blue'>Go to login page</a>
        </Link>
      </div>
    </React.Fragment>
  );
}
