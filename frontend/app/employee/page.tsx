import { Shell } from "@/components/shell";

import { Heading } from "@/components/ui/heading";

export default async function Admin() {
  return (
    <Shell as='div' className='gap-12'>
      <section>
        <Heading
          title='Employee page'
          description='Manage orders for your store'
        />
      </section>
    </Shell>
  );
}
