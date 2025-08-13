export const formatINR = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
export const clamp = (x: number, min: number, max: number) => Math.max(min, Math.min(max, x));
