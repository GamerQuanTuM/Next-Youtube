"use server";
import { prismadb } from "@/utils/prismadb";
import Cards from "../../components/Cards";
import Categories from "../../components/Categories";
import { axiosInstance } from "@/utils/baseURL";
import { Category } from "@prisma/client";

export default async function Home() {
  const categories = await prismadb.category.findMany();

  const options: String[] = [];
  categories.map((category: Category) => {
    options.push(category.name);
  });

  console.log(options);
  return (
    <main className="text-3xl h-[38rem] overflow-y-auto">
      <Categories category={options} />
      <Cards />
    </main>
  );
}
