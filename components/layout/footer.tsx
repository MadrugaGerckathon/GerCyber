'use client'

import { Mail, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  const scrollToSection = (href: string) => {
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-[hsl(220,20%,3%)] border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-white rounded-lg px-3 py-2">
                <Image
                  src="/logoGerCyberV4.webp"
                  alt="Logo GerCyber - Gertec Brasil"
                  width={180}
                  height={50}
                  className="h-10 w-auto object-contain"
                  unoptimized
                />
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Soluções especializadas em segurança da informação e infraestrutura de TI para os setores de varejo e meios de pagamento.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Navegação</h3>
            <div className="flex flex-col gap-2">
              {[
                { label: 'Serviços', href: '#servicos' },
                { label: 'Metodologia', href: '#metodologia' },
                { label: 'Contato', href: '#contato' },
              ]?.map((item) => (
                <button
                  key={item?.href}
                  onClick={() => scrollToSection(item?.href ?? '#')}
                  className="text-sm text-gray-400 hover:text-cyan-400 transition-colors text-left"
                >
                  {item?.label ?? ''}
                </button>
              ))}
              <Link href="/avaliacao" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                Avaliação de Maturidade
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Contato</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>contato@gercyber.com.br</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>(11) 2173-6500</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>São Paulo, SP</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} GerCyber by Gertec Brasil. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
