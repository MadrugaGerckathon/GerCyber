'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, ArrowRight, ArrowLeft, BarChart3, Building2, Mail, ChevronRight } from 'lucide-react'
import { AssessmentResult } from './assessment-result'

export interface CategoryScore {
  category: string
  score: number
  maxScore: number
  percent: number
}

export interface AssessmentData {
  companyName: string
  contactEmail: string
  sector: string
  totalScore: number
  maxScore: number
  percentScore: number
  maturityLevel: string
  categoryScores: CategoryScore[]
  recommendations: string[]
}

const categories = [
  {
    id: 'governance',
    title: 'Governança de TI',
    description: 'Políticas, processos e estrutura organizacional de TI',
    questions: [
      { text: 'Existe uma política de segurança da informação formalizada e atualizada?', options: ['Não existe', 'Existe informalmente', 'Formalizada mas desatualizada', 'Formalizada e atualizada', 'Revisada periodicamente com KPIs'] },
      { text: 'Há um responsável (CISO/DPO) dedicado à segurança da informação?', options: ['Não há', 'Acumulado com outras funções', 'Parcialmente dedicado', 'Dedicado mas sem equipe', 'Equipe completa e estruturada'] },
      { text: 'Como é o processo de gestão de riscos de TI?', options: ['Inexistente', 'Reativo apenas', 'Análises pontuais', 'Processo estruturado', 'Gestão contínua com ferramentas'] },
    ],
  },
  {
    id: 'data_protection',
    title: 'Proteção de Dados',
    description: 'Criptografia, backup, classificação e proteção de dados sensíveis',
    questions: [
      { text: 'Os dados sensíveis (cartões, dados pessoais) são criptografados em trânsito e em repouso?', options: ['Não são criptografados', 'Apenas em trânsito (SSL)', 'Parcialmente em repouso', 'Completo em trânsito e repouso', 'Criptografia ponto-a-ponto com HSM'] },
      { text: 'Existe classificação de dados e controle de acesso baseado em sensibilidade?', options: ['Não existe', 'Classificação básica', 'Classificação com controles parciais', 'Política completa implementada', 'Automatizada com DLP'] },
      { text: 'Qual a estratégia de backup e disaster recovery?', options: ['Sem backup estruturado', 'Backup manual esporádico', 'Backup automatizado sem teste', 'Backup testado periodicamente', 'DR completo com RTO/RPO definidos'] },
    ],
  },
  {
    id: 'infrastructure',
    title: 'Infraestrutura',
    description: 'Rede, servidores, cloud e ambiente tecnológico',
    questions: [
      { text: 'Como é a segmentação de rede do ambiente?', options: ['Rede flat sem segmentação', 'Segmentação básica por VLAN', 'Segmentação com firewall interno', 'Micro-segmentação', 'Zero Trust implementado'] },
      { text: 'Qual o nível de atualização (patch management) dos sistemas?', options: ['Sem processo definido', 'Atualizações manuais eventuais', 'Processo definido mas manual', 'Automatizado com atrasos', 'Automatizado em tempo hábil com SLA'] },
      { text: 'Como é o monitoramento do ambiente de TI?', options: ['Sem monitoramento', 'Monitoramento básico (ping/uptime)', 'SNMP/Syslog centralizado', 'NOC com dashboards', 'NOC + SIEM integrado 24/7'] },
    ],
  },
  {
    id: 'compliance',
    title: 'Compliance',
    description: 'Adequação a normas e regulamentações do setor',
    questions: [
      { text: 'Qual o nível de conformidade com PCI DSS (se aplicável)?', options: ['Desconhecemos o PCI DSS', 'Conhecemos mas não aplicamos', 'Em processo de adequação', 'Certificado com ressalvas', 'Certificado e em manutenção contínua'] },
      { text: 'Como está a adequação à LGPD?', options: ['Não iniciamos', 'Mapeamento inicial', 'Parcialmente adequado', 'Adequado com DPO', 'Programa completo com auditorias'] },
      { text: 'Existem auditorias periódicas de segurança?', options: ['Nunca realizamos', 'Já fizemos pontualmente', 'Anualmente', 'Semestralmente', 'Contínuas com pen test recorrente'] },
    ],
  },
  {
    id: 'incident_response',
    title: 'Resposta a Incidentes',
    description: 'Capacidade de detectar, responder e recuperar de incidentes',
    questions: [
      { text: 'Existe um plano de resposta a incidentes documentado?', options: ['Não existe', 'Existe informalmente', 'Documentado mas não testado', 'Documentado e testado', 'Testado com simulações regulares'] },
      { text: 'Qual a capacidade de detecção de ameaças?', options: ['Apenas antivírus básico', 'Firewall + antivírus', 'IDS/IPS implementado', 'SIEM com correlação', 'SOC com threat intelligence'] },
      { text: 'Em quanto tempo a equipe consegue responder a um incidente crítico?', options: ['Mais de 24 horas', '12 a 24 horas', '4 a 12 horas', '1 a 4 horas', 'Menos de 1 hora'] },
    ],
  },
  {
    id: 'awareness',
    title: 'Conscientização',
    description: 'Cultura de segurança e treinamento de colaboradores',
    questions: [
      { text: 'Existe programa de conscientização em segurança para colaboradores?', options: ['Não existe', 'Comunicações eventuais', 'Treinamento anual', 'Programa estruturado', 'Programa contínuo com métricas'] },
      { text: 'São realizados testes de phishing com os colaboradores?', options: ['Nunca', 'Já fizemos uma vez', 'Anualmente', 'Trimestralmente', 'Contínuo com gamificação'] },
      { text: 'Como é a política de senhas e autenticação?', options: ['Sem política definida', 'Política básica de complexidade', 'Complexidade + expiração', 'MFA para sistemas críticos', 'MFA universal + SSO + PAM'] },
    ],
  },
]

function getMaturityLevel(percent: number): string {
  if (percent >= 80) return 'Avançado'
  if (percent >= 60) return 'Intermediário'
  if (percent >= 40) return 'Em Desenvolvimento'
  if (percent >= 20) return 'Inicial'
  return 'Crítico'
}

function getRecommendations(categoryScores: CategoryScore[]): string[] {
  const recs: string[] = []
  const sorted = [...(categoryScores ?? [])].sort((a, b) => (a?.percent ?? 0) - (b?.percent ?? 0))

  sorted?.forEach?.((cat) => {
    const pct = cat?.percent ?? 0
    const name = cat?.category ?? ''
    if (pct < 40) {
      recs.push(`[CRITICO] ${name}: Nível crítico. Recomenda-se ação imediata com projeto dedicado de melhoria.`)
    } else if (pct < 60) {
      recs.push(`[ATENCAO] ${name}: Abaixo do ideal. Priorizar quick wins e plano de evolução em 90 dias.`)
    } else if (pct < 80) {
      recs.push(`[BOM] ${name}: Bom nível. Manter e buscar excelência com melhorias contínuas.`)
    }
  })

  if (recs?.length === 0) {
    recs.push('Parabéns! Sua empresa demonstra excelente maturidade em todas as dimensões avaliadas.')
    recs.push('Recomendamos manter o programa de melhoria contínua e acompanhar novas ameaças do setor.')
  }

  return recs
}

export function AssessmentPage() {
  const [step, setStep] = useState<'intro' | 'questions' | 'info' | 'result'>('intro')
  const [currentCategory, setCurrentCategory] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number[]>>({})
  const [companyName, setCompanyName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [sector, setSector] = useState('')
  const [result, setResult] = useState<AssessmentData | null>(null)
  const [saving, setSaving] = useState(false)

  const totalQuestions = categories?.reduce?.((acc, cat) => acc + (cat?.questions?.length ?? 0), 0) ?? 0
  const answeredCount = Object.values(answers ?? {})?.reduce?.((acc, arr) => acc + (arr?.length ?? 0), 0) ?? 0
  const progress = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0

  const handleAnswer = useCallback((value: number) => {
    const catId = categories?.[currentCategory]?.id ?? ''
    setAnswers((prev) => {
      const catAnswers = [...(prev?.[catId] ?? [])]
      catAnswers[currentQuestion] = value
      return { ...(prev ?? {}), [catId]: catAnswers }
    })

    const cat = categories?.[currentCategory]
    const qLen = cat?.questions?.length ?? 0
    if (currentQuestion < qLen - 1) {
      setCurrentQuestion((q) => q + 1)
    } else if (currentCategory < (categories?.length ?? 0) - 1) {
      setCurrentCategory((c) => c + 1)
      setCurrentQuestion(0)
    } else {
      setStep('info')
    }
  }, [currentCategory, currentQuestion])

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((q) => q - 1)
    } else if (currentCategory > 0) {
      setCurrentCategory((c) => c - 1)
      const prevCat = categories?.[currentCategory - 1]
      setCurrentQuestion((prevCat?.questions?.length ?? 1) - 1)
    }
  }

  const calculateResult = async () => {
    setSaving(true)
    const categoryScores: CategoryScore[] = categories?.map?.((cat) => {
      const catAnswers = answers?.[cat?.id ?? ''] ?? []
      const score = catAnswers?.reduce?.((acc, val) => acc + (val ?? 0), 0) ?? 0
      const maxScore = (cat?.questions?.length ?? 0) * 4
      return {
        category: cat?.title ?? '',
        score,
        maxScore,
        percent: maxScore > 0 ? Math.round((score / maxScore) * 100) : 0,
      }
    }) ?? []

    const totalScore = categoryScores?.reduce?.((acc, c) => acc + (c?.score ?? 0), 0) ?? 0
    const maxScore = categoryScores?.reduce?.((acc, c) => acc + (c?.maxScore ?? 0), 0) ?? 0
    const percentScore = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0
    const maturityLevel = getMaturityLevel(percentScore)
    const recommendations = getRecommendations(categoryScores)

    const data: AssessmentData = {
      companyName: companyName ?? '',
      contactEmail: contactEmail ?? '',
      sector: sector ?? '',
      totalScore,
      maxScore,
      percentScore,
      maturityLevel,
      categoryScores,
      recommendations,
    }

    try {
      await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          categoryScores: JSON.stringify(categoryScores),
          recommendations: JSON.stringify(recommendations),
        }),
      })
    } catch (err) {
      console.error('Error saving assessment:', err)
    }

    setResult(data)
    setStep('result')
    setSaving(false)
  }

  const currentCat = categories?.[currentCategory]
  const currentQ = currentCat?.questions?.[currentQuestion]
  const currentAnswer = answers?.[currentCat?.id ?? '']?.[currentQuestion]

  return (
    <section className="pt-24 pb-16 min-h-screen relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-15" />
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 relative z-10">
        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center pt-12"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-10 h-10 text-cyan-400" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                Avaliação de{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300">
                  Maturidade Digital
                </span>
              </h1>
              <p className="text-gray-400 max-w-lg mx-auto mb-8 leading-relaxed">
                Descubra o nível de maturidade em segurança e infraestrutura de TI da sua empresa.
                Responda 18 perguntas em 6 categorias e receba um diagnóstico completo.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10 max-w-lg mx-auto">
                {categories?.map?.((cat, i) => (
                  <div key={i} className="p-3 rounded-lg bg-[hsl(220,20%,7%)] border border-white/5 text-center">
                    <div className="text-xs text-cyan-400 font-semibold">{cat?.title ?? ''}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">{cat?.questions?.length ?? 0} perguntas</div>
                  </div>
                )) ?? []}
              </div>
              <button
                onClick={() => setStep('questions')}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-[hsl(220,20%,4%)] font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all flex items-center justify-center gap-2 mx-auto text-base"
              >
                Iniciar Avaliação
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {step === 'questions' && (
            <motion.div
              key={`q-${currentCategory}-${currentQuestion}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="pt-8"
            >
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>{currentCat?.title ?? ''}</span>
                  <span>{answeredCount}/{totalQuestions} respondidas</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="flex gap-1 mt-3">
                  {categories?.map?.((cat, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        i < currentCategory
                          ? 'bg-cyan-500'
                          : i === currentCategory
                          ? 'bg-cyan-500/50'
                          : 'bg-white/5'
                      }`}
                    />
                  )) ?? []}
                </div>
              </div>

              <div className="text-xs text-cyan-400 font-semibold tracking-widest uppercase mb-2">
                {currentCat?.title ?? ''} - Pergunta {currentQuestion + 1} de {currentCat?.questions?.length ?? 0}
              </div>
              <p className="text-xs text-gray-500 mb-4">{currentCat?.description ?? ''}</p>

              <h2 className="text-xl sm:text-2xl font-bold mb-8 leading-snug">
                {currentQ?.text ?? ''}
              </h2>

              <div className="space-y-3">
                {currentQ?.options?.map?.((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center gap-4 group ${
                      currentAnswer === i
                        ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                        : 'bg-[hsl(220,20%,7%)] border-white/5 hover:border-cyan-500/20 hover:bg-[hsl(220,20%,9%)] text-gray-300'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                      currentAnswer === i
                        ? 'bg-cyan-500 text-[hsl(220,20%,4%)]'
                        : 'bg-white/5 text-gray-500 group-hover:bg-cyan-500/10 group-hover:text-cyan-400'
                    }`}>
                      {i + 1}
                    </div>
                    <span className="text-sm">{option ?? ''}</span>
                    <ChevronRight className={`w-4 h-4 ml-auto transition-opacity ${
                      currentAnswer === i ? 'opacity-100 text-cyan-400' : 'opacity-0 group-hover:opacity-50'
                    }`} />
                  </button>
                )) ?? []}
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  disabled={currentCategory === 0 && currentQuestion === 0}
                  className="px-5 py-2.5 text-sm text-gray-400 hover:text-cyan-400 rounded-lg border border-white/5 hover:border-cyan-500/20 transition-all flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Anterior
                </button>
              </div>
            </motion.div>
          )}

          {step === 'info' && (
            <motion.div
              key="info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="pt-12 max-w-md mx-auto"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Quase lá!</h2>
                <p className="text-sm text-gray-400">
                  Informe seus dados para receber o diagnóstico personalizado. (Opcional)
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block">Nome da Empresa</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e?.target?.value ?? '')}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-[hsl(220,20%,9%)] border border-white/5 text-white text-sm focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all placeholder:text-gray-600"
                      placeholder="Sua empresa"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block">E-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e?.target?.value ?? '')}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-[hsl(220,20%,9%)] border border-white/5 text-white text-sm focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all placeholder:text-gray-600"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block">Setor</label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e?.target?.value ?? '')}
                    className="w-full px-4 py-3 rounded-lg bg-[hsl(220,20%,9%)] border border-white/5 text-white text-sm focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all"
                  >
                    <option value="" className="bg-[hsl(220,20%,9%)]">Selecione o setor</option>
                    <option value="varejo" className="bg-[hsl(220,20%,9%)]">Varejo</option>
                    <option value="meios_pagamento" className="bg-[hsl(220,20%,9%)]">Meios de Pagamento</option>
                    <option value="fintech" className="bg-[hsl(220,20%,9%)]">Fintech</option>
                    <option value="industria" className="bg-[hsl(220,20%,9%)]">Indústria</option>
                    <option value="servicos" className="bg-[hsl(220,20%,9%)]">Serviços</option>
                    <option value="outro" className="bg-[hsl(220,20%,9%)]">Outro</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setStep('questions')
                    const lastCatIdx = (categories?.length ?? 1) - 1
                    setCurrentCategory(lastCatIdx)
                    setCurrentQuestion((categories?.[lastCatIdx]?.questions?.length ?? 1) - 1)
                  }}
                  className="px-5 py-3 text-sm text-gray-400 hover:text-cyan-400 rounded-lg border border-white/5 hover:border-cyan-500/20 transition-all flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </button>
                <button
                  onClick={calculateResult}
                  disabled={saving}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-[hsl(220,20%,4%)] font-semibold rounded-lg hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {saving ? (
                    <div className="w-5 h-5 border-2 border-[hsl(220,20%,4%)] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Ver Resultado
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={calculateResult}
                disabled={saving}
                className="w-full mt-3 text-xs text-gray-500 hover:text-gray-400 transition-colors"
              >
                Pular e ver resultado sem dados de contato
              </button>
            </motion.div>
          )}

          {step === 'result' && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="pt-8"
            >
              <AssessmentResult data={result} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
