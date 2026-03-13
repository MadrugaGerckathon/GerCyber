'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { BarChart3, ArrowRight, Clock, Target, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function AssessmentCTA() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-24 bg-[hsl(220,20%,3%)] relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://cdn.abacus.ai/images/fd1d559d-6bb8-4bea-a270-2223c96147e6.png"
          alt="Padrão tecnológico abstrato de fundo"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220,20%,3%)] via-[hsl(220,20%,3%)]/90 to-[hsl(220,20%,3%)]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-6">
              <BarChart3 className="w-3.5 h-3.5" />
              Ferramenta exclusiva
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Avaliação de{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300">
                Maturidade Digital
              </span>
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Descubra o nível de maturidade de segurança e infraestrutura da sua empresa. Nossa ferramenta analisa 6 dimensões críticas e gera um diagnóstico completo com recomendações personalizadas.
            </p>

            <div className="flex flex-col gap-4 mb-8">
              {[
                { icon: Clock, text: 'Leva apenas 5 minutos para completar' },
                { icon: Target, text: 'Análise em 6 dimensões de segurança' },
                { icon: TrendingUp, text: 'Recomendações priorizadas e acionáveis' },
              ]?.map((item, i) => {
                const Icon = item?.icon ?? Clock
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-sm text-gray-300">{item?.text ?? ''}</span>
                  </div>
                )
              })}
            </div>

            <Link
              href="/avaliacao"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-[hsl(220,20%,4%)] font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all text-base"
            >
              Iniciar Avaliação Gratuita
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-xl bg-[hsl(220,20%,7%)] border border-white/10 p-6 shadow-2xl">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/30 mb-3">
                  <span className="text-3xl font-bold text-cyan-400">72%</span>
                </div>
                <h3 className="text-lg font-bold text-white">Nível Intermediário</h3>
                <p className="text-xs text-gray-500">Exemplo de resultado da avaliação</p>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Governança', value: 80 },
                  { label: 'Proteção de Dados', value: 65 },
                  { label: 'Infraestrutura', value: 85 },
                  { label: 'Compliance', value: 60 },
                  { label: 'Resposta a Incidentes', value: 55 },
                  { label: 'Conscientização', value: 70 },
                ]?.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">{item?.label ?? ''}</span>
                      <span className="text-cyan-400 font-semibold">{item?.value ?? 0}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-1000"
                        style={{ width: `${item?.value ?? 0}%` }}
                      />
                    </div>
                  </div>
                )) ?? []}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
