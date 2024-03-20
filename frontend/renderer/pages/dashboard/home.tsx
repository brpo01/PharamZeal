import React from "react";
import Head from "next/head";
import Link from "next/link";
import type { ReactElement } from "react";

import type { NextPageWithLayout } from "../_app";
import PageLayout from "../../components/Layout";

import {
  Layout,
  Form,
  Select,
  InputNumber,
  DatePicker,
  Switch,
  Slider,
  Button,
} from "antd";

const { Header, Content } = Layout;
const { Item: FormItem } = Form;
const { Option } = Select;

const HomePage: NextPageWithLayout = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Pharm Zeal - Dashboard</title>
      </Head>

      <div className='container'>
        <h1 className='text-2xl'>Dashboard</h1>
      </div>
    </React.Fragment>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};

export default HomePage;
