'use client'

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import type { CategoryScore } from './assessment-page'

export default function RadarChartInner({ categoryScores }: { categoryScores: CategoryScore[] }) {
  const data = (categoryScores ?? [])?.map?.((cat) => ({
    subject: cat?.category?.split?.(' ')?.[0] ?? '',
    fullName: cat?.category ?? '',
    score: cat?.percent ?? 0,
    fullMark: 100,
  })) ?? []

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
        <PolarGrid stroke="rgba(255,255,255,0.06)" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fontSize: 11, fill: '#9ca3af' }}
          tickLine={false}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 100]}
          tick={{ fontSize: 10, fill: '#6b7280' }}
          tickLine={false}
          axisLine={false}
        />
        <Radar
          name="Maturidade"
          dataKey="score"
          stroke="#22d3ee"
          fill="#22d3ee"
          fillOpacity={0.2}
          strokeWidth={2}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(220, 20%, 7%)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            fontSize: 11,
            color: '#e5e7eb',
          }}
          formatter={(value: number) => [`${value ?? 0}%`, 'Score']}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
