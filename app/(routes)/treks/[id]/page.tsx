'use client'
import { useParams, useRouter } from 'next/navigation'
import treks from '@/data/treks.json'
import Pill from '@/app/components/Pill'
import { formatINR } from '@/utils/format'
import Modal from '@/app/components/Modal'
import { useState } from 'react'

export default function TrekDetail(){
  const { id } = useParams<{id:string}>()
  const trek = (treks as any[]).find(t => t.id === id)
  const router = useRouter()
  const [open, setOpen] = useState(false)

  if(!trek) return <div className="p-6">Not found</div>

  const minPrice = Math.min(...trek.providers.map((p:any)=>p.price))
  const bestRating = Math.max(...trek.providers.map((p:any)=>p.rating))

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <button onClick={()=>router.back()} className="text-sm underline">← Back</button>
      <h1 className="text-3xl font-bold mt-2">{trek.name}</h1>
      <div className="text-sm text-gray-600">{trek.region} • {trek.difficulty} • {trek.duration} days • {trek.altitude} ft</div>

      <div className="grid md:grid-cols-3 gap-4 mt-4">
        <div className="p-4 border rounded-2xl bg-white">
          <div className="text-[11px] text-gray-600">From</div>
          <div className="text-xl font-bold">{formatINR(minPrice)}</div>
        </div>
        <div className="p-4 border rounded-2xl bg-white">
          <div className="text-[11px] text-gray-600">Best rating</div>
          <div className="text-lg font-semibold">⭐ {bestRating.toFixed(1)}</div>
        </div>
        <div className="p-4 border rounded-2xl bg-white">
          <div className="text-[11px] text-gray-600">Best months</div>
          <div>{trek.seasons.join(', ')}</div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Providers</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-2 border">Provider</th>
                <th className="text-left p-2 border">Price</th>
                <th className="text-left p-2 border">Rating</th>
                <th className="text-left p-2 border">Group size</th>
                <th className="text-left p-2 border">Upcoming starts</th>
                <th className="text-left p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {trek.providers.sort((a:any,b:any)=>a.price-b.price).map((p:any,i:number)=> (
                <tr key={i} className="odd:bg-white even:bg-gray-50">
                  <td className="p-2 border font-medium">{p.name}</td>
                  <td className="p-2 border">{formatINR(p.price)}</td>
                  <td className="p-2 border">⭐ {p.rating.toFixed(1)}</td>
                  <td className="p-2 border">{p.groupSize}</td>
                  <td className="p-2 border text-xs">
                    <div className="flex flex-wrap gap-1">
                      {p.startDates.map((d:string,idx:number)=> <Pill key={idx}>{d}</Pill>)}
                    </div>
                  </td>
                  <td className="p-2 border"><button className="px-2 py-1 rounded-lg border bg-white hover:bg-gray-50 text-xs" onClick={()=>setOpen(true)}>Go to site →</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-[11px] text-gray-500 mt-3">Note: Demo data for preview. Real-time inventory & links to be connected.</div>
        </div>
      </div>

      <Modal open={open} onClose={()=>setOpen(false)} title="Outgoing link">
        <div className="p-3 text-sm">In a real app, this button would take you to the provider website with tracking parameters.</div>
      </Modal>
    </div>
  )
}
