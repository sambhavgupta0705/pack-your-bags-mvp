'use client'
import { useMemo } from 'react'
import treksData from '@/data/treks.json'
import { Trek } from '@/types/trek'
import { useAppStore } from '@/store/useAppStore'

const bestOffer = (trek: Trek) => {
  const minPrice = Math.min(...trek.providers.map(p=>p.price));
  const bestRating = Math.max(...trek.providers.map(p=>p.rating));
  const cheapest = trek.providers.find(p=>p.price===minPrice);
  const topRated = trek.providers.find(p=>p.rating===bestRating);
  return { minPrice, bestRating, cheapest, topRated };
}

export function useTreks(){
  const { filters } = useAppStore();
  const { q, region, difficulty, season, priceCap, minAltitude, duration, sort } = filters;

  const REGIONS = useMemo(()=> Array.from(new Set(treksData.map(t=>t.region))), []);
  const DIFFICULTIES = ['Easy','Moderate','Difficult','Expert'] as const;
  const SEASONS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] as const;

  const maxPrice = useMemo(()=> Math.max(...treksData.flatMap(t=>t.providers.map(p=>p.price))), []);
  const maxDuration = useMemo(()=> Math.max(...treksData.map(t=>t.duration)), []);

  const treks = useMemo(()=>{
    const filtered = (treksData as Trek[]).filter(t=>{
      const {minPrice} = bestOffer(t);
      const matchesQ = t.name.toLowerCase().includes(q.toLowerCase());
      const matchesRegion = region === 'All' || t.region === region;
      const matchesDiff = difficulty === 'All' || t.difficulty === difficulty;
      const matchesSeason = season === 'All' || t.seasons.includes(season);
      const matchesPrice = minPrice <= priceCap;
      const matchesAltitude = t.altitude >= minAltitude;
      const matchesDuration = t.duration <= duration;
      return matchesQ && matchesRegion && matchesDiff && matchesSeason && matchesPrice && matchesAltitude && matchesDuration;
    }).sort((a,b)=>{
      if(sort === 'Price (Lowest)') return bestOffer(a).minPrice - bestOffer(b).minPrice;
      if(sort === 'Rating (Highest)') return bestOffer(b).bestRating - bestOffer(a).bestRating;
      if(sort === 'Altitude (High→Low)') return b.altitude - a.altitude;
      if(sort === 'Duration (Short→Long)') return a.duration - b.duration;
      const recA = (a.popularity*2) + bestOffer(a).bestRating*100 - bestOffer(a).minPrice/1000;
      const recB = (b.popularity*2) + bestOffer(b).bestRating*100 - bestOffer(b).minPrice/1000;
      return recB - recA;
    });
    return filtered;
  }, [q, region, difficulty, season, priceCap, minAltitude, duration, sort]);

  return { treks, REGIONS, DIFFICULTIES, SEASONS, maxPrice, maxDuration, bestOffer };
}
