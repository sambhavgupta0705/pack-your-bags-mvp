'use client'
import Pill from '@/app/components/Pill'
import { formatINR } from '@/utils/format'
import { useAppStore } from '@/store/useAppStore'
import { useTreks } from '@/app/hooks/useTreks'
import { Trek } from '@/types/trek'

export default function CompareTray(){
  const { compare, clearCompare } = useAppStore()
  const { treks, bestOffer } = useTreks()
  const selected = treks.filter(t => compare.includes(t.id)) as Trek[]

  if(!selected.length) return null;
  return (
    <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 max-w-5xl w-[92vw]`}>
      <div className="rounded-2xl border bg-white shadow-xl p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="font-semibold">Compare treks ({selected.length}/3)</div>
          <button onClick={clearCompare} className="px-3 py-1 rounded-xl border bg-white hover:bg-gray-50 text-xs">Clear</button>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {selected.map(t=>{
            const info = bestOffer(t);
            return (
              <div key={t.id} className="p-3 rounded-xl border bg-gray-50">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold leading-tight">{t.name}</div>
                    <div className="text-[11px] text-gray-600">{t.region} • {t.difficulty}</div>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-[12px]">
                  <div className="p-2 rounded-lg bg-white border">
                    <div className="text-[10px] text-gray-600">From</div>
                    <div className="font-semibold">{formatINR(info.minPrice)}</div>
                    <div className="text-[10px] text-gray-500">{info.cheapest?.name}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white border">
                    <div className="text-[10px] text-gray-600">Top rated</div>
                    <div className="font-semibold">⭐ {info.bestRating.toFixed(1)}</div>
                    <div className="text-[10px] text-gray-500">{info.topRated?.name}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white border col-span-2">
                    <div className="text-[10px] text-gray-600">Specs</div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Pill>{t.duration} days</Pill>
                      <Pill>{t.altitude} ft</Pill>
                      <Pill>Best: {t.seasons.slice(0,3).join(", ")}{t.seasons.length>3?"…":""}</Pill>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
