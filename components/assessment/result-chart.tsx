'use client'

import dynamic from 'next/dynamic'
import type { CategoryScore } from './assessment-page'

const RadarChartComponent = dynamic(() => import('./radar-chart-inner'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
})

export function ResultChart({ categoryScores }: { categoryScores: CategoryScore[] }) {
  return <RadarChartComponent categoryScores={categoryScores ?? []} />
}
