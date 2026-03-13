import { AssessmentPage } from '@/components/assessment/assessment-page'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function Avaliacao() {
  return (
    <main className="min-h-screen">
      <Header />
      <AssessmentPage />
      <Footer />
    </main>
  )
}
