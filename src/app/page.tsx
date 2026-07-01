import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Projects } from '@/components/Projects'
import { About } from '@/components/About'
import { Technologies } from '@/components/Technologies'
import { Process } from '@/components/Process'
import { Differentials } from '@/components/Differentials'
import { Timeline } from '@/components/Timeline'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Technologies />
        <Process />
        <Differentials />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
