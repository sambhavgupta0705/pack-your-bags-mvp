import { ReactNode } from 'react'
export default function Pill({ children, className = '' }: { children: ReactNode; className?: string }){
  return <span className={`px-2 py-1 rounded-full text-xs font-medium bg-white/70 border ${className}`}>{children}</span>
}
