'use client'

import { motion } from 'framer-motion'
import { Shield, TrendingUp, AlertTriangle, CheckCircle2, ArrowRight, RotateCcw } from 'lucide-react'
import Link from 'next/link'
import type { AssessmentData } from './assessment-page'
import { ResultChart } from './result-chart'

function getLevelColor(level: string): string {
  switch (level) {
    case 'Avançado': return 'text-emerald-400'
    case 'Intermediário': return 'text-cyan-400'
    case 'Em Desenvolvimento': return 'text-amber-400'
    case 'Inicial': return 'text-orange-400'
    case 'Crítico': return 'text-red-400'
    default: return 'text-gray-400'
  }
}

function getLevelBg(level: string): string {
  switch (level) {
    case 'Avançado': return 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30'
    case 'Intermediário': return 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/30'
    case 'Em Desenvolvimento': return 'from-amber-500/20 to-amber-500/5 border-amber-500/30'
    case 'Inicial': return 'from-orange-500/20 to-orange-500/5 border-orange-500/30'
    case 'Crítico': return 'from-red-500/20 to-red-500/5 border-red-500/30'
    default: return 'from-gray-500/20 to-gray-500/5 border-gray-500/30'
  }
}

function getScoreBarColor(percent: number): string {
  if (percent >= 80) return 'from-emerald-500 to-emerald-400'
  if (percent >= 60) return 'from-cyan-500 to-cyan-400'
  if (percent >= 40) return 'from-amber-500 to-amber-400'
  return 'from-red-500 to-red-400'
}

export function AssessmentResult({ data }: { data: AssessmentData }) {
  const level = data?.maturityLevel ?? ''
  const percent = data?.percentScore ?? 0
  const categories = data?.categoryScores ?? []
  const recommendations = data?.recommendations ?? []

  return (
    <div className="space-y-8">
      {/* Score principal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`text-center p-8 rounded-2xl bg-gradient-to-b ${getLevelBg(level)} border`}
      >
        <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-[hsl(220,20%,7%)] border-2 border-current mb-4 relative">
          <span className={`text-4xl font-bold ${getLevelColor(level)}`}>{percent}%</span>
        </div>
        <h2 className={`text-2xl font-bold ${getLevelColor(level)}`}>Nível {level}</h2>
        {data?.companyName && <p className="text-sm text-gray-400 mt-1">{data.companyName}</p>}
        <p className="text-xs text-gray-500 mt-2">Score total: {data?.totalScore ?? 0}/{data?.maxScore ?? 0} pontos</p>
      </motion.div>

      {/* Gráfico radar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-xl bg-[hsl(220,20%,7%)] border border-white/5 shadow-lg"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-cyan-400" />
          Análise por Categoria
        </h3>
        <div className="h-[320px]">
          <ResultChart categoryScores={categories} />
        </div>
      </motion.div>

      {/* Barras de progresso */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-xl bg-[hsl(220,20%,7%)] border border-white/5 shadow-lg"
      >
        <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
          <Shield className="w-5 h-5 text-cyan-400" />
          Detalhamento por Dimensão
        </h3>
        <div className="space-y-4">
          {categories?.map?.((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
            >
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-gray-300 font-medium">{cat?.category ?? ''}</span>
                <span className={`font-bold ${(cat?.percent ?? 0) >= 60 ? 'text-cyan-400' : (cat?.percent ?? 0) >= 40 ? 'text-amber-400' : 'text-red-400'}`}>
                  {cat?.percent ?? 0}%
                </span>
              </div>
              <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${cat?.percent ?? 0}%` }}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
                  className={`h-full rounded-full bg-gradient-to-r ${getScoreBarColor(cat?.percent ?? 0)}`}
                />
              </div>
            </motion.div>
          )) ?? []}
        </div>
      </motion.div>

      {/* Recomendações */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-6 rounded-xl bg-[hsl(220,20%,7%)] border border-white/5 shadow-lg"
      >
        <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          Recomendações Priorizadas
        </h3>
        <div className="space-y-3">
          {recommendations?.map?.((rec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02]"
            >
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300 leading-relaxed">{rec ?? ''}</p>
            </motion.div>
          )) ?? []}
        </div>
      </motion.div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 pb-8">
        <Link
          href="/#contato"
          className="flex-1 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-[hsl(220,20%,4%)] font-semibold rounded-lg hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] transition-all flex items-center justify-center gap-2"
        >
          Falar com um Especialista
          <ArrowRight className="w-4 h-4" />
        </Link>
        <button
          onClick={() => window?.location?.reload?.()}
          className="px-6 py-3.5 border border-white/10 text-gray-300 hover:border-cyan-500/30 hover:text-cyan-400 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Refazer Avaliação
        </button>
      </div>
    </div>
  )
}
