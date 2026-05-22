import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
        <span className="text-xl font-bold text-emerald-400">SpendSmart AI</span>
        <button
          onClick={() => navigate('/audit')}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          Start Free Audit
        </button>
      </nav>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm px-4 py-1.5 rounded-full mb-6">
          Free — No signup required
        </div>

        <h1 className="text-5xl font-bold leading-tight mb-6">
          Are you overpaying for <br />
          <span className="text-emerald-400">AI tools?</span>
        </h1>

        <p className="text-slate-400 text-xl mb-10 max-w-2xl mx-auto">
          Get a free audit of your AI tool spend in 2 minutes. See exactly where you're overspending and how much you could save.
        </p>

        <button
          onClick={() => navigate('/audit')}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition shadow-lg shadow-emerald-500/20"
        >
          Audit My AI Spend →
        </button>

        <p className="text-slate-500 text-sm mt-4">
          Takes 2 minutes · No credit card · No login
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-20 border-t border-slate-700 pt-12">
          <div>
            <div className="text-3xl font-bold text-white">$1,200+</div>
            <div className="text-slate-400 text-sm mt-1">Avg annual savings found</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">8</div>
            <div className="text-slate-400 text-sm mt-1">AI tools analyzed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">2 min</div>
            <div className="text-slate-400 text-sm mt-1">To complete audit</div>
          </div>
        </div>
      </div>
    </div>
  );
}