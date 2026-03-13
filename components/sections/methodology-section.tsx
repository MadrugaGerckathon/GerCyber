'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Search, BarChart3, Lightbulb, Wrench, ShieldCheck, RotateCcw } from 'lucide-react'

const steps = [
  {
    icon: Search,
    phase: '01',
    title: 'Análise',
    subtitle: 'Diagnóstico & Mapeamento',
    description: 'Análise profunda do ambiente atual, identificação de gaps de segurança e mapeamento completo da infraestrutura.',
    details: ['Inventário de ativos', 'Análise de vulnerabilidades', 'Entrevistas com stakeholders'],
  },
  {
    icon: BarChart3,
    phase: '02',
    title: 'Avaliação',
    subtitle: 'Avaliação & Classificação',
    description: 'Avaliação de maturidade digital, classificação de riscos e benchmarking com padrões do setor.',
    details: ['Score de maturidade', 'Matriz de riscos', 'Gap analysis'],
  },
  {
    icon: Lightbulb,
    phase: '03',
    title: 'Estratégia',
    subtitle: 'Planejamento & Roadmap',
    description: 'Elaboração de plano estratégico com priorização baseada em impacto e esforço de implementação.',
    details: ['Roadmap priorizado', 'Business case', 'Quick wins'],
  },
  {
    icon: Wrench,
    phase: '04',
    title: 'Implementação',
    subtitle: 'Execução & Deploy',
    description: 'Implementação das soluções com gestão de mudanças e mínimo impacto nas operações.',
    details: ['Deploy faseado', 'Gestão de mudanças', 'Treinamento'],
  },
  {
    icon: ShieldCheck,
    phase: '05',
    title: 'Validação',
    subtitle: 'Testes & Certificação',
    description: 'Validação completa das implementações com testes de segurança e certificação de conformidade.',
    details: ['Pen testing', 'Auditoria', 'Certificação'],
  },
  {
    icon: RotateCcw,
    phase: '06',
    title: 'Continuidade',
    subtitle: 'Monitoramento & Evolução',
    description: 'Monitoramento contínuo, relatórios periódicos e evolução constante da postura de segurança.',
    details: ['SOC 24/7', 'KPIs mensais', 'Melhoria contínua'],
  },
]

export function MethodologySection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="metodologia" className="py-24 bg-[hsl(220,20%,3%)] relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">Metodologia</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Metodologia G-Secure™</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Nossa metodologia proprietária garante resultados consistentes com abordagem estruturada em 6 fases.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps?.map((step, i) => {
            const Icon = step?.icon ?? Search
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group relative p-6 rounded-xl bg-[hsl(220,20%,6%)] border border-white/5 hover:border-cyan-500/20 transition-all duration-300 shadow-lg hover:shadow-cyan-500/5"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-11 h-11 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-cyan-400/60 uppercase">Fase {step?.phase ?? ''}</span>
                    <h3 className="text-lg font-bold text-white">{step?.title ?? ''}</h3>
                    <p className="text-xs text-gray-500">{step?.subtitle ?? ''}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">{step?.description ?? ''}</p>
                <div className="flex flex-wrap gap-2">
                  {step?.details?.map?.((detail, j) => (
                    <span key={j} className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-gray-400">
                      {detail ?? ''}
                    </span>
                  )) ?? []}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
