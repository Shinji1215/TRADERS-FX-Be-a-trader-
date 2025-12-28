import React, { useState } from 'react';
import { TrendingUp, Zap, CheckCircle2, Sparkles, Menu, X, ArrowUpRight } from 'lucide-react';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/5 h-20 flex items-center px-6">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-amber-500 w-8 h-8" />
            <span className="text-xl font-black uppercase tracking-tighter italic">Traders <span className="text-amber-500">FX</span></span>
          </div>
          <div className="hidden md:flex gap-8 text-[12px] font-bold uppercase tracking-widest">
            <a href="#scalping" className="hover:text-amber-500 transition-colors">Scalping</a>
            <a href="#swing" className="hover:text-amber-500 transition-colors">Swing Strategy</a>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-48 pb-32 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold mb-8 tracking-widest uppercase">
          <Sparkles size={14} /> Professional Trading Community
        </div>
        <h1 className="text-6xl md:text-9xl font-black mb-6 leading-none tracking-tighter italic">
          BE A <br /><span className="text-amber-500 text-glow">TRADER</span>
        </h1>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">トレードで真の自由を。最新のマーケットプロトコルに基づいた戦略を提供します。</p>
      </header>

      {/* Scalping Protocol */}
      <section id="scalping" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-black mb-8 italic uppercase tracking-tighter">Scalping <span className="text-amber-500">Protocol</span></h2>
            <div className="space-y-6">
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5">
                <h3 className="text-xl font-bold text-amber-500 mb-4 flex items-center gap-2"><Zap size={20} /> 三つの根拠</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3 items-start"><CheckCircle2 className="text-amber-500 mt-1 shrink-0" size={18} /> <div><b>流動性狩り:</b> レジサポを一時的に抜けて戻る「ダマシ」を確認</div></li>
                  <li className="flex gap-3 items-start"><CheckCircle2 className="text-amber-500 mt-1 shrink-0" size={18} /> <div><b>EMAクロス:</b> 短期・中期の指数平滑移動平均線の交差による勢い</div></li>
                  <li className="flex gap-3 items-start"><CheckCircle2 className="text-amber-500 mt-1 shrink-0" size={18} /> <div><b>BOS (Break of Structure):</b> 相場構造の破壊を確認</div></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-[40px] p-12 aspect-square flex flex-col justify-center">
             <div className="text-sm font-bold text-amber-500 mb-2 uppercase tracking-widest">Target Profit</div>
             <div className="text-7xl font-black mb-4 tracking-tighter">10-25<span className="text-2xl ml-2 text-slate-500">pips</span></div>
             <p className="text-slate-400">高勝率かつ短時間のトレード。1分足・5分足をメインに使用します。</p>
          </div>
        </div>
      </section>

      {/* Swing Section */}
      <section id="swing" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-16 italic uppercase tracking-tighter">Swing <span className="text-blue-500">Method</span></h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-[#020617] p-8 rounded-3xl border border-white/5">
              <h3 className="text-2xl font-bold mb-4">押し目買い戦略</h3>
              <p className="text-slate-400 leading-relaxed">直近高値から200pips以上の下落を待ち、価格が停滞したところでエントリーするゆったり手法。</p>
            </div>
            <div className="bg-[#020617] p-8 rounded-3xl border border-white/5">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Low Risk</h3>
              <p className="text-slate-400 leading-relaxed">1500pipsの逆行にも耐えられる低ロット運用。メンタルへの負荷を最小限に抑えます。</p>
            </div>
            <div className="bg-[#020617] p-8 rounded-3xl border border-white/5">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Big Profit</h3>
              <p className="text-slate-400 leading-relaxed">目標利益は約200pips。チャートに張り付く必要はなく、兼業トレーダーにも最適です。</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-24 text-center border-t border-white/5 text-slate-600">
        <div className="flex items-center justify-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 opacity-50" />
          <span className="font-bold uppercase tracking-[0.3em] text-[10px]">Traders FX</span>
        </div>
        <p className="text-[10px] tracking-widest">© 2025 ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
};

export default App;
