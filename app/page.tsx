import { TokenTable } from "@/components/TokenTable/TokenTable";
import { TopNavigation } from "@/components/Navigation";
import { FilterBar } from "@/components/FilterBar";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-[family-name:var(--font-geist-sans)]">
      <TopNavigation />

      <main className="max-w-[1600px] mx-auto flex flex-col gap-4">
        <FilterBar />
        <div className="px-6">
          <TokenTable />
        </div>
      </main>
    </div>
  );
}
