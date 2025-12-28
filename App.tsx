import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  TrendingUp, Shield, BookOpen, Brain, Clock, 
  Menu, X, ExternalLink, ChevronRight, CheckCircle2,
  ArrowUpRight, DollarSign, Globe, Smartphone,
  BarChart3, Sparkles, AlertOctagon, Target, Zap, Info, ArrowLeft,
  Copy, Check, Users, Coins, ShieldAlert, ZapOff, Scale, Calendar, Layers, AlertTriangle,
  Coffee, Anchor, Monitor, PlayCircle, MousePointer2, Briefcase, Key, FastForward, Sun, Moon
} from 'lucide-react';

// --- インタラクティブ・ダイナミクス ---
const useInteractiveDynamics = () => {
  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}`);
    };
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      document.documentElement.style.setProperty('--mouse-x', `${x}`);
      document.documentElement.style.setProperty('--mouse-y', `${y}`);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
};

// --- スクロール・リビール ---
const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return ref;
};

const AnimatedTitle = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => {
  const revealRef = useScrollReveal();
  return (
    <div ref={revealRef} className={`title-reveal ${className}`}>
      {children}
    </div>
  );
};

// --- 背景アニメーション ---
const ChartBackground3D = () => {
  const candles = useMemo(() => {
    return [...Array(40)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      height: 30 + Math.random() * 80,
      isUp: Math.random() > 0.45,
      z: -500 + Math.random() * 800,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-slate-950">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      {candles.map((c) => (
        <div 
          key={c.id} 
          className="absolute w-1 rounded-full animate-pulse" 
          style={{ 
            top: c.top, 
            left: c.left,
            height: `${c.height}px`,
            backgroundColor: c.isUp ? '#10b981' : '#ef4444',
            filter: 'blur(1px)',
            opacity: 0.2
          }} 
        />
      ))}
    </div>
  );
};

// --- Scalping Visual ---
const ScalpingVisual = () => (
  <div className="relative w-full h-64 bg-slate-900/60 rounded-3xl border border-amber-500/20 overflow-hidden p-6">
    <div className="flex items-end justify-between h-full gap-1">
      {[40, 60, 45, 90, 20, 100, 30, 50].map((h, i) => (
        <div key={i} className={`flex-1 rounded-t-lg ${i === 5 ? 'bg-red-500 animate-bounce' : 'bg-amber-500/40'}`} style={{ height: `${h}%` }}>
          {i === 5 && <span className="absolute -top-8 text-[10px] text-red-500 font-bold whitespace-nowrap">流動性狩り!</span>}
        </div>
      ))}
    </div>
  </div>
);

// --- Swing Visual ---
const SwingVisual = () => (
  <div className="relative w-full h-64 bg-slate-900/60 rounded-3xl border border-blue-500/20 overflow-hidden p-6">
    <svg className="w-full h-full" viewBox="0 0 400 200">
      <path d="M0,180 C100,180 150,150 200,80 C250,10 350,50 400,20" fill="none" stroke="#3b82f6" strokeWidth="4" className="animate-pulse" />
      <circle cx="200" cy="80" r="10" fill="#3b82f6" />
      <text x="215" y="90" fill="#3b82f6" className="text-[12px] font-black uppercase tracking-widest">Entry Zone</text>
    </svg>
  </div>
);

const App: React.FC = () => {
  useInteractiveDynamics();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500/40">
      <ChartBackground3D />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5 h-20 flex items-center px-6">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('home')}>
            <TrendingUp className="text-amber-500 w-8 h-8" />
            <span className="text-xl font-display font-black uppercase">Traders <span className="text-amber-500">FX</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[11px] font-display font-black tracking-widest uppercase">
            <button onClick={() => scrollToSection('scalping')} className="hover:text-amber-500 transition-colors">Scalping</button>
            <button onClick={() => scrollToSection('swing')} className="hover:text-amber-500 transition-colors">Swing</button>
            <a href="#" className="px-6 py-3 bg-amber-500 text-slate-950 rounded-full font-bold">JOIN HUB</a>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="relative pt-48 pb-32 flex flex-col items-center justify-center text-center px-6 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold mb-8 tracking-widest uppercase animate-bounce">
          <Sparkles size={14} /> Elite Trading Community
        </div>
        <h1 className="text-6xl md:text-9xl font-display font-black mb-6 leading-none uppercase tracking-tighter">
          BE A <br /><span className="text-amber-500">TRADER</span>
        </h1>
        <p className="text-xl md:text-3xl font-bold text-slate-400 mb-12">トレードで真の自由を。</p>
        <button onClick={() => scrollToSection('scalping')} className="px-12 py-6 bg-amber-500 text-slate-950 rounded-2xl font-black text-lg hover:scale-105 transition-transform shadow-2xl shadow-amber-500/20">GET STARTED</button>
      </header>

      {/* Scalping Section */}
      <section id="scalping" className="py-32 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedTitle className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-display font-black uppercase">Scalping <span className="text-amber-500">Protocol</span></h2>
          </AnimatedTitle>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-slate-900/50 p-8 rounded-[32px] border border-white/5">
                <h3 className="text-2xl font-black text-amber-500 mb-4 flex items-center gap-2">
                  <Zap /> 三つの根拠
                </h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex gap-3"><CheckCircle2 className="text-amber-500 shrink-0" /> <span><b>流動性狩り:</b> レジサポを抜けて即戻る動きを確認</span></li>
                  <li className="flex gap-3"><CheckCircle2 className="text-amber-500 shrink-0" /> <span><b>EMAクロス:</b> 反発方向への勢いを確認</span></li>
                  <li className="flex gap-3"><CheckCircle2 className="text-amber-500 shrink-0" /> <span><b>BOS:</b> 構造の破壊でエントリーを確定</span></li>
                </ul>
              </div>
              <div className="bg-slate-900/50 p-8 rounded-[32px] border border-white/5">
                <h4 className="font-bold mb-2">💰 目標利確</h4>
                <p className="text-3xl font-black text-white">10 〜 25 pips</p>
              </div>
            </div>
            <ScalpingVisual />
          </div>
        </div>
      </section>

      {/* Swing Section */}
      <section id="swing" className="py-32 bg-slate-900/30 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedTitle className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-display font-black uppercase text-blue-500">Swing <span className="text-white">Method</span></h2>
          </AnimatedTitle>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <SwingVisual />
            <div className="space-y-6">
              <h3 className="text-3xl font-black uppercase">ゆったり構える「押し目買い」</h3>
              <p className="text-slate-400 leading-relaxed">
                長期的な上昇トレンドの「押し目」を狙う、初心者でも再現しやすい手法です。チャートに張り付く必要はありません。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                  <p className="text-[10px] font-bold text-blue-500 uppercase mb-1">Entry Condition</p>
                  <p className="text-sm font-bold">高値から200pips下落後の停滞</p>
                </div>
                <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                  <p className="text-[10px] font-bold text-blue-500 uppercase mb-1">Risk Manage</p>
                  <p className="text-sm font-bold">1500pips逆行に耐えるロット</p>
                </div>
              </div>
              <div className="p-6 bg-amber-500/5 border border-amber-500/20 rounded-2xl italic text-xs text-slate-400">
                ※損切りは設定せず、低レバレッジで資金管理を徹底します。
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 text-center relative z-10">
        <TrendingUp className="text-amber-500 mx-auto mb-6" />
        <p className="text-[10px] tracking-[0.3em] text-slate-500">© 2025 TRADERS FX. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
};

export default App;
