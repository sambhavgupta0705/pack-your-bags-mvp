'use client'
import { ReactNode } from 'react'
export default function Modal({open,onClose,children,title}:{open:boolean;onClose:()=>void;children:ReactNode;title?:string}){
  if(!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white max-w-4xl w-[92vw] rounded-2xl shadow-2xl border p-4 md:p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
          <button onClick={onClose} className="px-3 py-1 rounded-xl border hover:bg-gray-50">✕</button>
        </div>
        <div className="max-h-[70vh] overflow-auto">{children}</div>
      </div>
    </div>
  )
}
