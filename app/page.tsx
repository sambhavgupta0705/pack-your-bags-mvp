"use client"
import './globals.css'
import FiltersBar from '@/app/components/FiltersBar'
import TrekCard from '@/app/components/TrekCard'
import CompareTray from '@/app/components/CompareTray'
import { useTreks } from '@/app/hooks/useTreks'

export const dynamic = 'force-static'

export default function Page(){
  const { treks, bestOffer } = useTreks()
  return (
    <div className="min-h-screen text-gray-900">
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="shrink-0 w-10 h-10 rounded-2xl bg-sky-600 text-white grid place-items-center text-lg font-bold">🗻</div>
          <div className="font-bold text-xl">Pack Your Bags</div>
        </div>
      </header>

      <FiltersBar />

      <main className="max-w-7xl mx-auto px-4 pb-28">
        {treks.length===0 && (
          <div className="p-6 rounded-2xl border bg-white text-center text-sm">No treks found. Try relaxing filters.</div>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {treks.map(t => (
            <TrekCard key={t.id} trek={t as any} bestOffer={bestOffer} />
          ))}
        </div>
      </main>

      <CompareTray />
      <footer className="text-center text-[11px] text-gray-500 py-8">TypeScript • Zustand • App Router • © Pack Your Bags</footer>
    </div>
  )
}
