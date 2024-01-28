import type { Metadata } from "next";
import { Roboto } from "next/font/google";


import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const inter = Roboto({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

      <main lang="en">
        <div className={`${inter.className} overflow-hidden`}>
          <Navbar />
          <div className="flex">
            <div className="min-w-[9%] w-[18%] h-[89vh]">
              <Sidebar />
            </div>
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </main>

  );
}
