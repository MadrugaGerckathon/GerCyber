'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const navItems = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Metodologia', href: '#metodologia' },
  { label: 'Setores', href: '#setores' },
  { label: 'Contato', href: '#contato' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[hsl(220,20%,4%)]/90 backdrop-blur-xl border-b border-[hsl(190,100%,50%)]/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="flex items-center group">
              <div className="bg-white rounded-lg px-3 py-2 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all">
                <Image
                  src="/logoGerCyberV4.webp"
                  alt="GerCyber by Gertec Brasil"
                  width={220}
                  height={60}
                  className="h-10 sm:h-12 w-auto object-contain"
                  priority
                  unoptimized
                />
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems?.map((item) => (
                <button
                  key={item?.href}
                  onClick={() => scrollToSection(item?.href ?? '#')}
                  className="px-4 py-2 text-sm text-gray-300 hover:text-cyan-400 rounded-lg hover:bg-white/5 transition-all"
                >
                  {item?.label ?? ''}
                </button>
              ))}
              <Link
                href="/avaliacao"
                className="ml-3 px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-cyan-500 to-cyan-600 text-[hsl(220,20%,4%)] rounded-lg hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] transition-all flex items-center gap-1"
              >
                Avaliação Gratuita
                <ChevronRight className="w-4 h-4" />
              </Link>
            </nav>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-cyan-400"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[hsl(0, 0%, 100%)]/98 backdrop-blur-xl border-b border-cyan-500/10 md:hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navItems?.map((item) => (
                <button
                  key={item?.href}
                  onClick={() => scrollToSection(item?.href ?? '#')}
                  className="px-4 py-3 text-sm text-gray-300 hover:text-cyan-400 rounded-lg hover:bg-white/5 text-left transition-all"
                >
                  {item?.label ?? ''}
                </button>
              ))}
              <Link
                href="/avaliacao"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-5 py-3 text-sm font-semibold bg-gradient-to-r from-cyan-500 to-cyan-600 text-[hsl(220,20%,4%)] rounded-lg text-center"
              >
                Avaliação Gratuita
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
