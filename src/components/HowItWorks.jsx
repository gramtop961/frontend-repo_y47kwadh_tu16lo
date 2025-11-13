import { motion } from 'framer-motion'

export default function HowItWorks() {
  const steps = [
    { title: 'Paste Content', desc: 'Drop in any article, essay, or snippet. Add an optional title and source link.' },
    { title: 'Pick Mode', desc: 'Choose Fake News or Plagiarism. We tailor the analysis and scoring.' },
    { title: 'Get Verdict', desc: 'See a clear score, verdict, and rationale with beautiful visual feedback.' },
  ]
  return (
    <section id="how" className="relative w-full bg-[#07070B] py-20 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_10%_0%,rgba(180,83,9,0.15)_0%,rgba(0,0,0,0)_60%),radial-gradient(40%_30%_at_90%_0%,rgba(59,130,246,0.15)_0%,rgba(0,0,0,0)_60%)]" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.h2 initial={{opacity:0,y:8}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.5}} className="text-3xl font-bold tracking-tight sm:text-4xl">How it works</motion.h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div key={s.title} initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-white/10 text-sm font-bold">{i+1}</div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-white/70">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
