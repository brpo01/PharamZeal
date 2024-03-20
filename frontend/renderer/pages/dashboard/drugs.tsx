import React from "react";
import Head from "next/head";
import type { ReactElement } from "react";

import type { NextPageWithLayout } from "../_app";
import Layout from "../../components/Layout";

const DrugsPage: NextPageWithLayout = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Pharm Zeal - Drugs</title>
      </Head>

      <div className='container'>
        <h1 className='text-2xl'>Drugs</h1>
      </div>
    </React.Fragment>
  );
};

DrugsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default DrugsPage;
