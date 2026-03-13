'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Building2, Award, Users, Globe, Target, Eye, ShieldCheck } from 'lucide-react'
import Image from 'next/image'

export function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="sobre" className="py-24 relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="https://cdn.abacus.ai/images/c9248d17-fbe5-46e1-8307-0c73b62ad367.png"
                alt="Equipe profissional de consultoria Gertec em reunião"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,20%,4%)]/60 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">Sobre Nós</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">GerCyber</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              A GerCyber nasce da expertise tecnológica e da solidez do Grupo Gertec, unindo décadas de inovação com o que há de mais avançado em proteção de dados e infraestrutura digital. Em um cenário onde as ameaças cibernéticas evoluem em velocidade sem precedentes, surgimos como o braço estratégico focado em consultoria de segurança da informação, preparado para blindar operações e garantir a continuidade dos negócios de nossos clientes.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Nossa origem está fundamentada na vivência em ambientes de altíssima criticidade e rigor regulatório, como o mercado financeiro. Essa bagagem nos permite transpor padrões de excelência, controles rígidos e metodologias de alta maturidade para empresas de diversos setores que buscam não apenas proteção, mas resiliência digital.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Building2, label: 'Fundação', value: '2026' },
                { icon: Award, label: 'Origem', value: 'Gertec' },
                { icon: Users, label: 'Foco', value: 'Cibersegurança' },
                { icon: Globe, label: 'Presença', value: 'Nacional' },
              ]?.map((item, i) => {
                const Icon = item?.icon ?? Building2
                return (
                  <div key={i} className="p-4 rounded-lg bg-[hsl(220,20%,7%)] border border-white/5">
                    <Icon className="w-5 h-5 text-cyan-400 mb-2" />
                    <div className="text-xs text-gray-500">{item?.label ?? ''}</div>
                    <div className="text-lg font-bold text-white">{item?.value ?? ''}</div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 mt-16"
        >
          {[
            {
              icon: Target,
              title: 'Missão',
              text: 'Proteger informações e fortalecer a segurança digital das organizações por meio de consultoria especializada, aplicando a experiência de ambientes altamente regulados.',
            },
            {
              icon: Eye,
              title: 'Visão',
              text: 'Ser referência em consultoria de cibersegurança, levando ao mercado práticas e padrões utilizados em setores de alta maturidade, como o financeiro.',
            },
            {
              icon: ShieldCheck,
              title: 'Valores',
              text: 'Ética, Integridade, Confiança, Excelência Técnica, Compromisso com Resultados e Evolução Contínua em cada entrega.',
            },
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-xl bg-gradient-to-b from-[hsl(220,20%,7%)] to-transparent border border-white/5 hover:border-cyan-400/30 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-cyan-400/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}