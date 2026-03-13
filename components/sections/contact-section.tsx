'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Send, CheckCircle, AlertCircle, Mail, Phone, MapPin, Building2, MessageCircleCode } from 'lucide-react'

export function ContactSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [form, setForm] = useState({
    name: '', email: '', company: '', phone: '', subject: '', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form?.name || !form?.email || !form?.subject || !form?.message) return
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res?.ok) {
        setStatus('success')
        setForm({ name: '', email: '', company: '', phone: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contato" className="py-24 bg-[hsl(220,20%,3%)] relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">Contato</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Fale com nossos especialistas</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Tem um desafio de segurança ou infraestrutura? Nossa equipe está pronta para ajudar.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            {[
              { icon: Mail, label: 'E-mail', value: 'contato@gercyber.com.br' },
              { icon: Phone, label: 'Telefone', value: '(11) 2173-6500' },
              { icon: MapPin, label: 'Endereço', value: 'São Paulo, SP - Brasil' },
              { icon: Building2, label: 'Horário', value: 'Seg-Sex, 08:00h às 17:30h' },
              { icon: MessageCircleCode, label: 'Fale com nossos representantes', value: 'Clique aqui!', href: 'https://wa.me/5511972734677' },
            ]?.map((item, i) => {
              const Icon = item?.icon ?? Mail
              return (
                <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-[hsl(220,20%,6%)] border border-white/5">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">{item?.label ?? ''}</div>
                    {item?.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-cyan-400 font-medium hover:underline"
                      >
                        {item.value ?? item.href}
                      </a>
                    ) : (
                      <div className="text-sm text-white font-medium">{item?.value ?? ''}</div>
                    )}
                  </div>
                </div>
              )
            })}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 p-6 rounded-xl bg-[hsl(220,20%,6%)] border border-white/5 shadow-lg"
          >
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">Nome *</label>
                <input
                  type="text"
                  value={form?.name ?? ''}
                  onChange={(e) => setForm({ ...(form ?? {}), name: e?.target?.value ?? '' })}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[hsl(220,20%,9%)] border border-white/5 text-white text-sm focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all placeholder:text-gray-600"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">E-mail *</label>
                <input
                  type="email"
                  value={form?.email ?? ''}
                  onChange={(e) => setForm({ ...(form ?? {}), email: e?.target?.value ?? '' })}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[hsl(220,20%,9%)] border border-white/5 text-white text-sm focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all placeholder:text-gray-600"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">Empresa</label>
                <input
                  type="text"
                  value={form?.company ?? ''}
                  onChange={(e) => setForm({ ...(form ?? {}), company: e?.target?.value ?? '' })}
                  className="w-full px-4 py-3 rounded-lg bg-[hsl(220,20%,9%)] border border-white/5 text-white text-sm focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all placeholder:text-gray-600"
                  placeholder="Nome da empresa"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">Telefone</label>
                <input
                  type="tel"
                  value={form?.phone ?? ''}
                  onChange={(e) => setForm({ ...(form ?? {}), phone: e?.target?.value ?? '' })}
                  className="w-full px-4 py-3 rounded-lg bg-[hsl(220,20%,9%)] border border-white/5 text-white text-sm focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all placeholder:text-gray-600"
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-xs text-gray-400 mb-1.5 block">Assunto *</label>
              <input
                type="text"
                value={form?.subject ?? ''}
                onChange={(e) => setForm({ ...(form ?? {}), subject: e?.target?.value ?? '' })}
                required
                className="w-full px-4 py-3 rounded-lg bg-[hsl(220,20%,9%)] border border-white/5 text-white text-sm focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all placeholder:text-gray-600"
                placeholder="Como podemos ajudar?"
              />
            </div>
            <div className="mb-6">
              <label className="text-xs text-gray-400 mb-1.5 block">Mensagem *</label>
              <textarea
                value={form?.message ?? ''}
                onChange={(e) => setForm({ ...(form ?? {}), message: e?.target?.value ?? '' })}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-[hsl(220,20%,9%)] border border-white/5 text-white text-sm focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all resize-none placeholder:text-gray-600"
                placeholder="Descreva seu desafio ou necessidade..."
              />
            </div>

            {status === 'success' && (
              <div className="mb-4 flex items-center gap-2 text-sm text-emerald-400 bg-emerald-400/10 px-4 py-3 rounded-lg">
                <CheckCircle className="w-4 h-4" />
                Mensagem enviada com sucesso! Entraremos em contato em breve.
              </div>
            )}
            {status === 'error' && (
              <div className="mb-4 flex items-center gap-2 text-sm text-red-400 bg-red-400/10 px-4 py-3 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                Erro ao enviar. Tente novamente.
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-[hsl(220,20%,4%)] font-semibold rounded-lg hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {status === 'loading' ? (
                <div className="w-5 h-5 border-2 border-[hsl(220,20%,4%)] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Enviar Mensagem
                </>
              )}
            </button>
            <p className="text-[11px] text-gray-600 mt-3 text-center">
              Seus dados serão tratados com sigilo conforme nossa política de privacidade.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}