import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: 'GerCyber by Gertec Brasil | Segurança & Infraestrutura de TI',
  description: 'GerCyber - Consultoria especializada em segurança da informação e infraestrutura de TI para varejo e meios de pagamento. By Gertec Brasil.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'GerCyber by Gertec Brasil | Segurança & Infraestrutura de TI',
    description: 'Consultoria especializada em segurança da informação e infraestrutura de TI para varejo e meios de pagamento.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js"></script>
      </head>
      <body className={`${inter.variable} ${jetbrains.variable} font-sans bg-[hsl(220,20%,4%)] text-[hsl(210,40%,95%)] antialiased`}>
        {children}
      </body>
    </html>
  )
}
