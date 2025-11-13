export default function Footer(){
  return (
    <footer className="w-full bg-[#05050A] py-8 text-center text-white/60">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm">© {new Date().getFullYear()} Veritas • Built for your college showcase</p>
      </div>
    </footer>
  )
}
