import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AdminSidebar } from "@/components/layout/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='relative flex min-h-screen flex-col'>
      <SiteHeader />
      <div className='relative'>
        <div className='h-full w-48 flex-col fixed z-40 border-r'>
          <AdminSidebar />
        </div>
        <main className='pl-48'>{children}</main>
      </div>
      <SiteFooter />
    </div>
  );
}
