import Hero from './Hero'
import Analyzer from './components/Analyzer'
import HowItWorks from './components/HowItWorks'
import Footer from './components/Footer'

function Navbar(){
  return (
    <div className="fixed left-0 right-0 top-0 z-50 mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <a href="#" className="flex items-center gap-2 text-white">
        <span className="inline-flex size-7 items-center justify-center rounded-md bg-white text-[#0A0A0F] font-black">V</span>
        <span className="text-sm font-semibold text-white/90">Veritas</span>
      </a>
      <div className="hidden items-center gap-6 text-sm text-white/80 sm:flex">
        <a className="hover:text-white" href="#analyzer">Analyzer</a>
        <a className="hover:text-white" href="#how">How</a>
        <a className="hover:text-white" href="/test">Status</a>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <Navbar />
      <Hero />
      <Analyzer />
      <HowItWorks />
      <Footer />
    </div>
  )
}

export default App
