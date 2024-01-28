import Cards from "../../components/Cards";
import Categories from "../../components/Categories";

export default function Home() {
  return (
    <main className="text-3xl h-[38rem] overflow-y-auto">
      <Categories />
      <Cards />
    </main>
  );
}
