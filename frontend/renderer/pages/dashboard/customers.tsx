import React from "react";
import Head from "next/head";
import Link from "next/link";
import type { ReactElement } from "react";

import type { NextPageWithLayout } from "../_app";
import Layout from "../../components/Layout";

const CustomersPage: NextPageWithLayout = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Pharm Zeal - Customers</title>
      </Head>
      <div className='grid grid-col-1 text-2xl w-full text-center pt-8'>
        <h1>Customer Page</h1>
      </div>
    </React.Fragment>
  );
};

CustomersPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CustomersPage;
