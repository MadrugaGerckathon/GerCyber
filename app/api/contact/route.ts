export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request?.json()
    const { name, email, company, phone, subject, message } = body ?? {}

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Campos obrigatórios não preenchidos' }, { status: 400 })
    }

    const contact = await prisma?.contact?.create({
      data: {
        name: name ?? '',
        email: email ?? '',
        company: company ?? null,
        phone: phone ?? null,
        subject: subject ?? '',
        message: message ?? '',
      },
    })

    return NextResponse.json({ success: true, id: contact?.id ?? '' })
  } catch (error) {
    console.error('Error creating contact:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
