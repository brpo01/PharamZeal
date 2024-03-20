import React from "react";
import Head from "next/head";
import type { ReactElement } from "react";

import type { NextPageWithLayout } from "../_app";
import Layout from "../../components/Layout";

const InventoryPage: NextPageWithLayout = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Pharm Zeal - Inventory</title>
      </Head>
      <div className='container'>
        <h1 className='text-2xl'>Inventory</h1>
      </div>
    </React.Fragment>
  );
};

InventoryPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default InventoryPage;
