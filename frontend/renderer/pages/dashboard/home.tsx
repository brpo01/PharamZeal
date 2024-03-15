import React from "react";
import Head from "next/head";
import Link from "next/link";
import type { ReactElement } from "react";

import type { NextPageWithLayout } from "../_app";
import Layout from "../../components/layout";

const HomePage: NextPageWithLayout = () => {
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
        <Link href='/auth/login'>
          <a className='btn-blue'>login</a>
        </Link>
        <Link href='/dashboard/inventory'>
          <a className='btn-blue'>Inventory</a>
        </Link>
        <Link href='/dashboard/customer'>
          <a className='btn-blue'>Customer</a>
        </Link>
      </div>
    </React.Fragment>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default HomePage;
