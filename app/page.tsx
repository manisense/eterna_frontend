import Image from "next/image";

import { TokenTable } from "@/components/TokenTable/TokenTable";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-7xl mx-auto flex flex-col gap-8">
        <header className="flex flex-col gap-2 mb-4">
          {/* Header Content */}
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Market Pulse
          </h1>
          <p className="text-gray-400">Live token updates and trading volume.</p>
        </header>

        <TokenTable />
      </main>
    </div>
  );
}
