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
      <div className='container'>
        <h1 className='text-2xl'>Customers</h1>
      </div>
    </React.Fragment>
  );
};

CustomersPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CustomersPage;
