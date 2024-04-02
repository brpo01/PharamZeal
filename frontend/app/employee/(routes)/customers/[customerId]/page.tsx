const CustomerPage = async ({
  params,
}: {
  params: { customerId: string; storeId: string };
}) => {
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <h1>Customer Page</h1>
      </div>
    </div>
  );
};

export default CustomerPage;
