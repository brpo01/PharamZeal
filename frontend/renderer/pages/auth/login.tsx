import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { Button, Checkbox, Form, type FormProps, Input } from "antd";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export default function NextPage() {
  return (
    <React.Fragment>
      <Head>
        <title>Pharm Zeal - Login </title>
      </Head>

      <div className='grid min-h-screen grid-cols-2 overflow-hidden w-full'>
        <Image
          src='/images/syringe.avif'
          alt='A phone screen'
          width='100%'
          height='100%'
          className=''
          priority
        />

        <div className='container flex justify-center items-center'>
          <Form
            name='basic'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <Form.Item<FieldType>
              label='Username'
              name='username'
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label='Password'
              name='password'
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              name='remember'
              valuePropName='checked'
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>

            <Link href='/dashboard/home'>
              <a className='btn-blue'>Go to home page</a>
            </Link>
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
}
