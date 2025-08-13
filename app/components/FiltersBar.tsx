'use client'
import { useEffect } from 'react'
import Range from '@/app/components/Range'
import Pill from '@/app/components/Pill'
import { useAppStore } from '@/store/useAppStore'
import { useTreks } from '@/app/hooks/useTreks'
import { formatINR, clamp } from '@/utils/format'

export default function FiltersBar(){
  const { treks, REGIONS, DIFFICULTIES, SEASONS, maxPrice, maxDuration } = useTreks()
  const { filters, setFilters, resetFilters } = useAppStore()

  useEffect(()=>{
    // Initialize caps when app mounts
    setFilters({ priceCap: maxPrice, duration: maxDuration })
  }, [maxPrice, maxDuration, setFilters])

  return (
    <section className="max-w-7xl mx-auto px-4 py-4">
      <div className="grid md:grid-cols-6 gap-3">
        <div className="md:col-span-2">
          <div className="text-xs mb-1">Search</div>
          <input value={filters.q} onChange={e=>setFilters({ q: e.target.value })} placeholder="Find a trek (e.g., Kedarkantha)" className="w-full px-3 py-2 rounded-xl border bg-white"/>
        </div>
        <div>
          <div className="text-xs mb-1">Region</div>
          <select value={filters.region} onChange={e=>setFilters({ region: e.target.value })} className="w-full px-3 py-2 rounded-xl border bg-white">
            <option>All</option>
            {REGIONS.map(r=> <option key={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <div className="text-xs mb-1">Difficulty</div>
          <select value={filters.difficulty} onChange={e=>setFilters({ difficulty: e.target.value })} className="w-full px-3 py-2 rounded-xl border bg-white">
            <option>All</option>
            {DIFFICULTIES.map(d=> <option key={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <div className="text-xs mb-1">Season</div>
          <select value={filters.season} onChange={e=>setFilters({ season: e.target.value })} className="w-full px-3 py-2 rounded-xl border bg-white">
            <option>All</option>
            {SEASONS.map(s=> <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <div className="text-xs mb-1">Sort</div>
          <select value={filters.sort} onChange={e=>setFilters({ sort: e.target.value as any })} className="w-full px-3 py-2 rounded-xl border bg-white">
            {['Recommended','Price (Lowest)','Rating (Highest)','Altitude (High→Low)','Duration (Short→Long)'].map(o=> <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-4">
        <Range label="Budget cap" min={6000} max={maxPrice} step={500} value={filters.priceCap} onChange={(v)=>setFilters({ priceCap: v })} format={formatINR} />
        <Range label="Min altitude" min={0} max={18000} step={250} value={filters.minAltitude} onChange={(v)=>setFilters({ minAltitude: v })} format={(v)=>v+' ft'} />
        <Range label="Max duration" min={3} max={maxDuration} step={1} value={filters.duration} onChange={(v)=>setFilters({ duration: clamp(v,3,maxDuration) })} format={(v)=>v+' days'} />
      </div>

      <div className="flex gap-2 mt-3">
        <button onClick={()=>resetFilters({ ...filters, q:'', region:'All', difficulty:'All', season:'All', priceCap:maxPrice, minAltitude:0, duration:maxDuration, sort:'Recommended' })} className="px-3 py-2 rounded-xl border bg-white hover:bg-gray-50">Reset filters</button>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Pill>Treks: {treks.length}</Pill>
          {filters.region!=='All' && <Pill>{filters.region}</Pill>}
          {filters.difficulty!=='All' && <Pill>{filters.difficulty}</Pill>}
          {filters.season!=='All' && <Pill>Best in {filters.season}</Pill>}
          {filters.priceCap<maxPrice && <Pill>{'≤ '+formatINR(filters.priceCap)}</Pill>}
          {filters.minAltitude>0 && <Pill>{filters.minAltitude} ft+</Pill>}
          {filters.duration<maxDuration && <Pill>{filters.duration} days max</Pill>}
        </div>
      </div>
    </section>
  )
}
