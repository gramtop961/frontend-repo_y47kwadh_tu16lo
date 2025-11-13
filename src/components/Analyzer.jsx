import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Analyzer() {
  const [mode, setMode] = useState('fake_news')
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [source, setSource] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])
  const [error, setError] = useState('')

  const analyze = async (type) => {
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch(`${backend}/api/analyze/${type === 'fake_news' ? 'fake-news' : 'plagiarism'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, title: title || undefined, source_url: source || undefined }),
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const data = await res.json()
      setResult(data)
      setHistory((h) => [{ ...data, title, source_url: source }, ...h].slice(0, 6))
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const scoreToColor = (s) => {
    if (s >= 0.7) return 'text-red-400'
    if (s >= 0.5) return 'text-yellow-300'
    return 'text-emerald-400'
  }

  return (
    <section id="analyzer" className="relative w-full bg-[#0A0A0F] py-20 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_50%_at_50%_0%,rgba(120,119,198,0.25)_0%,rgba(0,0,0,0)_60%)]" />
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:grid-cols-2">
        <div className="space-y-6">
          <div className="inline-flex overflow-hidden rounded-xl border border-white/10 bg-white/5 p-1 text-sm backdrop-blur">
            {['fake_news','plagiarism'].map((m) => (
              <button key={m} onClick={() => setMode(m)} className={`rounded-lg px-4 py-2 transition-colors ${mode===m?'bg-white text-[#0A0A0F]':'text-white/80 hover:bg-white/10'}`}>
                {m === 'fake_news' ? 'Fake News' : 'Plagiarism'}
              </button>
            ))}
          </div>

          <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title (optional)" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          <input value={source} onChange={(e)=>setSource(e.target.value)} placeholder="Source URL (optional)" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500" />

          <textarea value={text} onChange={(e)=>setText(e.target.value)} rows={8} placeholder="Paste text here..." className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500" />

          <div className="flex items-center gap-3">
            <button disabled={loading || text.length<20} onClick={()=>analyze(mode)} className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#0A0A0F] transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50">
              {loading ? 'Analyzing...' : 'Run Analysis'}
              <svg xmlns="http://www.w3.org/2000/svg" className="size-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
            <span className="text-xs text-white/60">Min 20 characters</span>
          </div>

          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</p>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-3 text-sm font-semibold text-white/70">Result</h3>
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div key={result.id || result.verdict} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.25}} className="space-y-2">
                  <p className={`text-4xl font-black ${scoreToColor(result.score)}`}>{Math.round(result.score*100)}%</p>
                  <p className="text-lg text-white/80">{result.verdict}</p>
                  {result.details && (
                    <pre className="mt-3 max-h-56 overflow-auto rounded-lg bg-black/40 p-3 text-xs text-white/70">{JSON.stringify(result.details, null, 2)}</pre>
                  )}
                </motion.div>
              ) : (
                <p className="text-white/60">Run an analysis to see results.</p>
              )}
            </AnimatePresence>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-3 text-sm font-semibold text-white/70">Recent Analyses</h3>
            <div className="space-y-3">
              {history.length === 0 && <p className="text-white/60">No history yet.</p>}
              {history.map((h, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-3">
                  <div>
                    <p className="text-sm font-semibold text-white/90">{h.title || 'Untitled'}</p>
                    <p className="text-xs text-white/60">{h.type?.replace('_',' ') || 'analysis'} • {h.source_url || 'no source'}</p>
                  </div>
                  <span className={`text-sm font-bold ${scoreToColor(h.score)}`}>{Math.round(h.score*100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
