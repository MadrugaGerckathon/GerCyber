export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request?.json()
    const {
      companyName, contactEmail, sector,
      totalScore, maxScore, percentScore,
      maturityLevel, categoryScores, recommendations,
    } = body ?? {}

    const assessment = await prisma?.assessment?.create({
      data: {
        companyName: companyName ?? null,
        contactEmail: contactEmail ?? null,
        sector: sector ?? null,
        totalScore: totalScore ?? 0,
        maxScore: maxScore ?? 0,
        percentScore: percentScore ?? 0,
        maturityLevel: maturityLevel ?? '',
        categoryScores: typeof categoryScores === 'string' ? categoryScores : JSON.stringify(categoryScores ?? {}),
        recommendations: typeof recommendations === 'string' ? recommendations : JSON.stringify(recommendations ?? []),
      },
    })

    return NextResponse.json({ success: true, id: assessment?.id ?? '' })
  } catch (error) {
    console.error('Error creating assessment:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
