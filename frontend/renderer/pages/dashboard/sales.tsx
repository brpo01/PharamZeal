import React from "react";
import Head from "next/head";
import type { ReactElement } from "react";

import type { NextPageWithLayout } from "../_app";
import Layout from "../../components/Layout";

const SalesPage: NextPageWithLayout = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Pharm Zeal - Sales</title>
      </Head>
      <div className='container'>
        <h1 className='text-2xl'>Sales</h1>
      </div>
    </React.Fragment>
  );
};

SalesPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SalesPage;
