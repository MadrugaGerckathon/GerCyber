'use client'

import { motion } from 'framer-motion'
import { Shield, ArrowRight, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function HeroSection() {
  const scrollToServices = () => {
    const el = document.querySelector('#servicos')
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://cdn.abacus.ai/images/3ee18732-7562-4f88-8586-f83451db4849.png"
          alt="Fundo tecnológico com padrões de circuitos digitais"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,20%,4%)]/80 via-[hsl(220,20%,4%)]/70 to-[hsl(220,20%,4%)]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 pt-24 pb-16">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm">
              <Shield className="w-4 h-4" />
              <span>Grupo Gertec — Segurança & Infraestrutura de TI</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 max-w-4xl"
          >
            Proteja seu negócio com{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300">
              expertise
            </span>{' '}
            comprovada
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed"
          >
            Consultoria especializada em segurança da informação e infraestrutura de TI, com foco nos setores de varejo e meios de pagamento.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/avaliacao"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-[hsl(220,20%,4%)] font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all flex items-center justify-center gap-2 text-base"
            >
              Avaliação de Maturidade Gratuita
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button
              onClick={scrollToServices}
              className="px-8 py-4 border border-gray-600 text-gray-300 hover:border-cyan-500/50 hover:text-cyan-400 font-medium rounded-lg transition-all flex items-center justify-center gap-2 text-base"
            >
              Conheça nossos serviços
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10"
          >
            {[
              { value: '30+', label: 'Anos de mercado' },
              { value: '500+', label: 'Clientes atendidos' },
              { value: '99.9%', label: 'Disponibilidade' },
              { value: '24/7', label: 'Monitoramento' },
            ]?.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-cyan-400">{stat?.value ?? ''}</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">{stat?.label ?? ''}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-gray-500" />
        </motion.div>
      </motion.div>
    </section>
  )
}
