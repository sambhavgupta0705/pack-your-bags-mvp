'use client'
export default function Range({label, min, max, step=1, value, onChange, format=(v:number)=>String(v)}:{
  label: string; min: number; max: number; step?: number; value: number;
  onChange: (v:number)=>void; format?: (v:number)=>string;
}){
  return (
    <div>
      <div className="flex justify-between text-xs text-gray-600 mb-1"><span>{label}</span><span className="font-medium">{format(value)}</span></div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(Number(e.target.value))} className="w-full"/>
      <div className="flex justify-between text-[10px] text-gray-500 mt-1"><span>{format(min)}</span><span>{format(max)}</span></div>
    </div>
  )
}
