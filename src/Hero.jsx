import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden bg-[#07070B] text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-[#07070B]" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pt-28 text-center sm:pt-36">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-sm/6 text-white/80">Academic Integrity Suite</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.9 }} className="text-balance bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-5xl font-black leading-tight text-transparent sm:text-6xl md:text-7xl">
          Detect Fake News & Plagiarism with Style
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.9 }} className="mx-auto mt-6 max-w-2xl text-balance text-lg text-white/70">
          Veritas brings a cinematic, cyberpunk vibe to powerful text analysis. Paste content, hit analyze, and get clear verdicts with beautiful visuals.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.9 }} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#analyzer" className="group pointer-events-auto inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#07070B] shadow-[0_0_0_1px_rgba(255,255,255,.1)] transition-colors hover:bg-white/90">
            Start Analyzing
            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
          <a href="#how" className="pointer-events-auto inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition-colors hover:bg-white/10">How it works</a>
        </motion.div>
      </div>
    </section>
  )
}
