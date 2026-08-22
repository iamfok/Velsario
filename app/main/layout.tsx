import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import GlobalPageHero from '@/components/content/GlobalPageHero'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />

      <GlobalPageHero />

      <main className="min-h-screen">
        {children}
      </main>

      <Footer />
    </>
  )
}
