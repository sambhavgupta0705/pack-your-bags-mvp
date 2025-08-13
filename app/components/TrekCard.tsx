'use client'
import Pill from '@/app/components/Pill'
import { Trek } from '@/types/trek'
import { useAppStore } from '@/store/useAppStore'
import Link from 'next/link'
import { formatINR } from '@/utils/format'

export default function TrekCard({ trek, bestOffer }:{ trek: Trek; bestOffer: (t:Trek)=>any }){
  const { toggleCompare, compare } = useAppStore()
  const info = bestOffer(trek)
  const checked = compare.includes(trek.id)

  return (
    <div className="rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="h-28 bg-gradient-to-tr from-sky-200 to-indigo-200 relative">
        <div className="absolute bottom-2 left-2 flex gap-2">
          <Pill className="backdrop-blur">{trek.difficulty}</Pill>
          <Pill className="backdrop-blur">{trek.duration} days</Pill>
          <Pill className="backdrop-blur">{trek.altitude} ft</Pill>
        </div>
        <div className="absolute top-2 right-2 text-[10px] bg-white/80 border px-2 py-1 rounded-full">⭐ {info.bestRating.toFixed(1)}</div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link href={`/treks/${trek.id}`} className="font-semibold text-lg leading-tight hover:underline">{trek.name}</Link>
            <div className="text-xs text-gray-600">{trek.region} • Best in {trek.seasons.join(', ')}</div>
          </div>
          <label className="text-xs flex items-center gap-2 select-none">
            <input type="checkbox" checked={checked} onChange={()=>toggleCompare(trek.id)} />
            Compare
          </label>
        </div>

        <div className="mt-3 text-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] text-gray-600">From</div>
              <div className="text-lg font-bold">{formatINR(info.minPrice)}</div>
              <div className="text-[11px] text-gray-500">via {info.cheapest?.name}</div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-gray-600">Top rated</div>
              <div className="text-sm font-semibold">{info.topRated?.name}</div>
              <div className="text-[11px] text-gray-500">⭐ {info.bestRating.toFixed(1)}</div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Link href={`/treks/${trek.id}`} className="flex-1 px-3 py-2 rounded-xl border bg-white hover:bg-gray-50 text-center">View providers</Link>
          <button onClick={()=>toggleCompare(trek.id)} className={`px-3 py-2 rounded-xl border ${checked?'bg-sky-600 text-white border-sky-600':'bg-white hover:bg-gray-50'}`}>{checked?'Added':'Add to compare'}</button>
        </div>
      </div>
    </div>
  )
}
