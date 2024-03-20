import React from "react";
import Link from "next/link";

import Sidebar from "./Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const date = new Date();
  let hours = date.getHours();
  const status =
    hours < 12
      ? "Morning"
      : hours <= 18 && hours >= 12
      ? "Afternoon"
      : "Evening";

  return (
    <html lang='en' suppressHydrationWarning>
      <body className='relative'>
        <div className='flex h-full relative'>
          <Sidebar />
          <div className='w-full ml-48 '>
            {/* NAVBAR */}
            <nav className='bg-white px-4 py-2 w-full border-b sticky top-0 z-40'>
              <div className='flex justify-end items-center'>
                <div className='font-medium text-gray-900'>
                  <div className='text-base'>Good {status},</div>

                  <div className='text-xs'>
                    {new Date().toLocaleString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </nav>
            {/* NAVBAR */}
            <main className='bg-[#F4F4F4] w-full min-h-screen overflow-hidden py-4'>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
