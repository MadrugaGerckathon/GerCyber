'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ShoppingCart, CreditCard, CheckCircle } from 'lucide-react'
import Image from 'next/image'

const sectors = [
  {
    icon: ShoppingCart,
    title: 'Varejo',
    subtitle: 'Retail & E-commerce',
    image: 'https://cdn.abacus.ai/images/59ff872d-127d-49f0-9670-0f0f4609f5cb.png',
    description: 'Protegemos operações de varejo com soluções específicas para PDVs, e-commerce e ambientes omnichannel.',
    features: [
      'Segurança de PDV e terminais',
      'Proteção de e-commerce',
      'PCI DSS compliance',
      'Prevenção de fraudes',
      'Segmentação de rede de loja',
      'Backup e disaster recovery',
    ],
  },
  {
    icon: CreditCard,
    title: 'Meios de Pagamento',
    subtitle: 'Payments & Fintech',
    image: 'https://cdn.abacus.ai/images/3a8a4e82-58d7-40a7-9582-8de25fe3f67d.png',
    description: 'Expertise em segurança para processadoras, adquirentes, subadquirentes e fintechs de pagamento.',
    features: [
      'Criptografia ponto-a-ponto',
      'Tokenização de dados',
      'HSM e gestão de chaves',
      'Conformidade PCI PIN',
      'Segurança de APIs de pagamento',
      'Monitoramento de transações',
    ],
  },

{
    icon: ShoppingCart,
    title: 'FIDO2',
    subtitle: 'Security & Privacy',
    image: 'https://fututkoufxvsydsdqvxq.supabase.co/storage/v1/object/sign/Gerckathon/fidov2.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yOTEyODE4Ny1iMTQ3LTRhYTUtYmY2MS01MzZiMjMwYzc2OGYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJHZXJja2F0aG9uL2ZpZG92Mi5wbmciLCJpYXQiOjE3NzM0MTU4NTEsImV4cCI6MTgwNDk1MTg1MX0.oU8pRlVs3QxjMhd2Ds90E0qICwZzPO0jPzuDFemG7lA',
    description: 'O Fido é a solução completa para garantir segurança e privacidade em ambientes de varejo físico e digital. Desenvolvido para proteger operações críticas, ele oferece',
    features: [
      'Proteção no ponto de venda',
      'Conformidade regulatória',
      'PCI DSS compliance',
      'Prevenção de fraudes',
      'Segmentação de rede',
      'Backup e recuperação rápida',
    ],
},
]

export function SectorsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="setores" className="py-24 relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">Setores</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Especialistas onde importa</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Foco absoluto nos setores que mais precisam de segurança e infraestrutura robusta.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {sectors?.map((sector, i) => {
            const Icon = sector?.icon ?? ShoppingCart
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group rounded-xl bg-[hsl(220,20%,7%)] border border-white/5 hover:border-cyan-500/20 overflow-hidden transition-all duration-300 shadow-lg hover:shadow-cyan-500/5"
              >
                <div className="relative aspect-[2/1] overflow-hidden">
                  <Image
                    src={sector?.image ?? ''}
                    alt={`Setor de ${sector?.title ?? 'tecnologia'}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,20%,7%)] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{sector?.title ?? ''}</h3>
                      <p className="text-xs text-cyan-400">{sector?.subtitle ?? ''}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-400 mb-5 leading-relaxed">{sector?.description ?? ''}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {sector?.features?.map?.((feature, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-300">{feature ?? ''}</span>
                      </div>
                    )) ?? []}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
