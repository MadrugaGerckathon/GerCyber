'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Shield, Server, FileCheck, Network, Lock, Database, Eye, Cpu } from 'lucide-react'

const services = [
  {
    icon: Shield,
    title: 'Segurança da Informação',
    description: 'Avaliação de vulnerabilidades, testes de penetração, gestão de riscos e implementação de políticas de segurança robustas.',
    color: 'from-cyan-400 to-blue-500',
  },
  {
    icon: Server,
    title: 'Infraestrutura de TI',
    description: 'Projeto, implementação e otimização de infraestrutura de rede, servidores, storage e ambientes híbridos.',
    color: 'from-blue-400 to-indigo-500',
  },
  {
    icon: FileCheck,
    title: 'Compliance & Governança',
    description: 'Adequação a normas PCI DSS, LGPD, ISO 27001 e frameworks de governança de TI para o setor financeiro.',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    icon: Network,
    title: 'Arquitetura de Redes',
    description: 'Design e implementação de redes seguras, segmentação, firewalls de próxima geração e SD-WAN.',
    color: 'from-violet-400 to-purple-500',
  },
  {
    icon: Lock,
    title: 'Proteção de Dados',
    description: 'Criptografia, DLP, gestão de identidades e acessos (IAM) e proteção de dados sensíveis de pagamento.',
    color: 'from-amber-400 to-orange-500',
  },
  {
    icon: Eye,
    title: 'Monitoramento & SOC',
    description: 'Centro de operações de segurança 24/7, SIEM, detecção de ameaças e resposta a incidentes.',
    color: 'from-rose-400 to-pink-500',
  },
  {
    icon: Database,
    title: 'Cloud & Virtualização',
    description: 'Migração para nuvem, ambientes multi-cloud, containerização e orquestração de workloads.',
    color: 'from-sky-400 to-blue-500',
  },
  {
    icon: Cpu,
    title: 'Automação & DevSecOps',
    description: 'CI/CD seguro, infraestrutura como código, automação de processos e integração de segurança no pipeline.',
    color: 'from-lime-400 to-green-500',
  },
]

export function ServicesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="servicos" className="py-24 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">Serviços</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Soluções completas em TI</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Oferecemos um portfólio completo de serviços para proteger e otimizar a infraestrutura tecnológica do seu negócio.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services?.map((service, i) => {
            const Icon = service?.icon ?? Shield
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group p-6 rounded-xl bg-[hsl(220,20%,7%)] hover:bg-[hsl(220,20%,9%)] border border-white/5 hover:border-cyan-500/20 transition-all duration-300 shadow-lg hover:shadow-cyan-500/5"
              >
                <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${service?.color ?? 'from-cyan-400 to-blue-500'} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{service?.title ?? ''}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{service?.description ?? ''}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
