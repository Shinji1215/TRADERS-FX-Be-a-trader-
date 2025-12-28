
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  TrendingUp, Shield, BookOpen, Brain, Clock, 
  Menu, X, ExternalLink, ChevronRight, CheckCircle2,
  ArrowUpRight, DollarSign, Globe, Smartphone,
  BarChart3, Sparkles, AlertOctagon, Target, Zap, Info, ArrowLeft,
  Copy, Check, Users, Coins, ShieldAlert, ZapOff, Scale, Calendar, Layers, AlertTriangle,
  Coffee, Anchor, Monitor, PlayCircle, MousePointer2, Briefcase, Key, FastForward, Sun, Moon
} from 'lucide-react';
import { MARKET_SESSIONS, STRATEGY_STEPS, APP_LINKS, ACADEMY_CONTENT, TRADING_ASSETS } from './constants';

// --- Scroll & Mouse Dynamics Hook ---
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

// --- Academy Visual Animations ---

const ResSupVisual = () => (
  <div className="relative w-full h-48 sm:h-64 bg-slate-900/60 rounded-3xl border border-white/5 overflow-hidden p-6">
    <div className="absolute top-1/4 left-0 right-0 h-[2px] bg-red-500/30 border-t border-red-500/50 flex items-center justify-center">
      <span className="text-[10px] text-red-500 font-black tracking-widest bg-slate-900 px-2 uppercase z-10">Resistance</span>
    </div>
    <div className="absolute bottom-1/4 left-0 right-0 h-[2px] bg-emerald-500/30 border-t border-emerald-500/50 flex items-center justify-center">
      <span className="text-[10px] text-emerald-500 font-black tracking-widest bg-slate-900 px-2 uppercase z-10">Support</span>
    </div>
    <svg className="w-full h-full" viewBox="0 0 400 200">
      <path d="M0,100 L50,60 L100,140 L150,60 L200,140 L250,60 L300,140 L400,100" fill="none" stroke="#fbbf24" strokeWidth="3" className="indicator-line" />
      <circle r="6" fill="#fbbf24" className="animate-pulse">
        <animateMotion path="M0,100 L50,60 L100,140 L150,60 L200,140 L250,60 L300,140 L400,100" dur="4s" repeatCount="indefinite" />
      </circle>
    </svg>
  </div>
);

const TPSLVisual = () => (
  <div className="relative w-full h-48 sm:h-64 bg-slate-900/60 rounded-3xl border border-white/5 overflow-hidden p-6 flex flex-col justify-center">
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-28 h-8 bg-emerald-500/20 rounded-lg border border-emerald-500/40 flex items-center justify-center text-[10px] font-black text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]">TP (PROFIT)</div>
        <div className="flex-grow h-[2px] bg-emerald-500/10" />
      </div>
      <div className="flex items-center gap-4">
        <div className="w-28 h-8 bg-amber-500/20 rounded-lg border border-amber-500/40 flex items-center justify-center text-[10px] font-black text-amber-500">ENTRY LINE</div>
        <div className="flex-grow h-[2px] bg-amber-500/20" />
      </div>
      <div className="flex items-center gap-4">
        <div className="w-28 h-8 bg-red-500/20 rounded-lg border border-red-500/40 flex items-center justify-center text-[10px] font-black text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]">SL (LOSS)</div>
        <div className="flex-grow h-[2px] bg-red-500/10" />
      </div>
    </div>
    <div className="absolute right-1/4 flex items-center justify-center">
       <div className="w-4 h-4 bg-amber-500 rounded-full animate-bounce shadow-[0_0_20px_#fbbf24]" />
    </div>
  </div>
);

const SpreadVisual = () => (
  <div className="relative w-full h-48 sm:h-64 bg-slate-900/60 rounded-3xl border border-white/5 overflow-hidden p-6 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest opacity-50">Liquidity Gap (Spread)</div>
      <div className="flex items-center gap-8">
        <div className="flex flex-col items-center group">
          <div className="text-3xl font-display font-black text-red-400 group-hover:scale-110 transition-transform">2600.50</div>
          <div className="text-[10px] font-black text-slate-600 uppercase mt-1 tracking-widest">SELL / BID</div>
        </div>
        <div className="flex flex-col items-center h-full">
           <div className="w-px h-12 bg-gradient-to-b from-transparent via-slate-700 to-transparent animate-pulse" />
        </div>
        <div className="flex flex-col items-center group">
          <div className="text-3xl font-display font-black text-emerald-400 group-hover:scale-110 transition-transform">2600.65</div>
          <div className="text-[10px] font-black text-slate-600 uppercase mt-1 tracking-widest">BUY / ASK</div>
        </div>
      </div>
      <div className="mt-4 px-6 py-2 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-[12px] text-amber-500 font-black shadow-inner">
        COST: 1.5 pips
      </div>
    </div>
  </div>
);

const DowVisual = () => (
  <div className="relative w-full h-48 sm:h-64 bg-slate-900/60 rounded-3xl border border-white/5 overflow-hidden p-6">
    <svg className="w-full h-full" viewBox="0 0 400 200">
      <path d="M0,180 L80,140 L120,160 L200,80 L240,110 L320,30" fill="none" stroke="#3b82f6" strokeWidth="4" className="indicator-line" strokeLinecap="round" />
      {[ 
        {x: 80, y: 140, label: 'HH'}, {x: 120, y: 160, label: 'HL'},
        {x: 200, y: 80, label: 'HH'}, {x: 240, y: 110, label: 'HL'},
        {x: 320, y: 30, label: 'HH'}
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="6" fill={p.label === 'HH' ? '#10b981' : '#3b82f6'} className="animate-pulse" />
          <text x={p.x + 10} y={p.y + 15} fill={p.label === 'HH' ? '#10b981' : '#3b82f6'} className="text-[12px] font-black uppercase tracking-tighter">{p.label}</text>
        </g>
      ))}
    </svg>
  </div>
);

const SMCVisual = () => (
  <div className="relative w-full h-48 sm:h-64 bg-slate-900/60 rounded-3xl border border-white/5 overflow-hidden p-6">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-24 bg-amber-500/5 border border-amber-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
      <div className="text-[11px] text-amber-500 font-black uppercase text-center tracking-widest leading-tight">Institutional<br/>Order Block</div>
    </div>
    <svg className="w-full h-full" viewBox="0 0 400 200">
       <path d="M0,20 L120,30 L200,100 L250,90 L400,190" fill="none" stroke="#fbbf24" strokeWidth="4" className="indicator-line" strokeLinecap="round" />
       <circle cx="200" cy="100" r="8" fill="#fbbf24" className="animate-ping" />
    </svg>
  </div>
);

const VolatilityVisual = () => (
  <div className="relative w-full h-48 sm:h-64 bg-slate-900/60 rounded-3xl border border-white/5 overflow-hidden p-6 flex flex-col items-center justify-center">
    <div className="absolute top-4 flex items-center gap-2">
      <div className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
      <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">NFP / CPI Release</span>
    </div>
    <div className="flex gap-2 h-32 items-end">
      {[15, 12, 18, 100, 85, 110, 15, 10, 20].map((h, i) => (
        <div 
          key={i} 
          className={`w-2 rounded-full bg-amber-500 transition-all duration-300 ${i >= 3 && i <= 5 ? 'animate-bounce shadow-[0_0_20px_#fbbf24]' : 'opacity-30'}`} 
          style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} 
        />
      ))}
    </div>
  </div>
);

const SlingshotVisual = () => (
  <div className="relative w-full h-48 sm:h-64 bg-slate-900/60 rounded-3xl border border-white/5 overflow-hidden p-6">
    <svg className="w-full h-full" viewBox="0 0 400 200">
       <line x1="0" y1="80" x2="400" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="2" strokeDasharray="5,5" />
       <path d="M0,80 L150,80 L200,160 L240,20 L400,20" fill="none" stroke="#fbbf24" strokeWidth="5" className="indicator-line" strokeLinecap="round" />
       <circle cx="200" cy="160" r="12" fill="rgba(239,68,68,0.2)" className="animate-pulse" />
       <text x="215" y="170" fill="#ef4444" className="text-[12px] font-black uppercase tracking-[0.2em]">The Hunt</text>
    </svg>
  </div>
);

const AcademyVisual = ({ type }: { type?: string }) => {
  switch (type) {
    case 'res-sup': return <ResSupVisual />;
    case 'tp-sl': return <TPSLVisual />;
    case 'spread': return <SpreadVisual />;
    case 'dow': return <DowVisual />;
    case 'smc': return <SMCVisual />;
    case 'volatility': return <VolatilityVisual />;
    case 'slingshot': return <SlingshotVisual />;
    case 'liquidity': return <SlingshotVisual />;
    case 'ema': return <DowVisual />;
    case 'bos': return <DowVisual />;
    default: return null;
  }
};

// --- Scroll Reveal Hook ---
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

// --- Animated Title Component ---
const AnimatedTitle = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => {
  const revealRef = useScrollReveal();
  return (
    <div ref={revealRef} className={`title-reveal ${className}`}>
      {children}
    </div>
  );
};

// --- Advanced 3D Chart Background ---
const ChartBackground3D = () => {
  const candles = useMemo(() => {
    return [...Array(60)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      height: 30 + Math.random() * 80,
      isUp: Math.random() > 0.45,
      z: -500 + Math.random() * 800,
      duration: 8 + Math.random() * 12,
      delay: -Math.random() * 10
    }));
  }, []);

  return (
    <div className="chart-bg-container">
      <div className="chart-3d-scene">
        {candles.map((c) => (
          <div 
            key={c.id} 
            className="floating-candle animate-float-3d" 
            style={{ 
              top: c.top, 
              left: c.left,
              height: `${c.height}px`,
              color: c.isUp ? '#10b981' : '#ef4444',
              '--z': `${c.z}px`,
              '--duration': `${c.duration}s`,
              '--delay': `${c.delay}s`,
              boxShadow: `0 0 25px ${c.isUp ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}`,
              backgroundColor: c.isUp ? 'rgba(16,185,129,0.8)' : 'rgba(239,68,68,0.8)',
              opacity: Math.max(0.1, 1 - Math.abs(c.z) / 600)
            } as any} 
          />
        ))}
      </div>
      <div className="depth-fog" />
    </div>
  );
};

// --- Hero Chart Overlay ---
const HeroChartOverlay = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
        <path d="M0,200 Q150,150 250,220 T450,180 T650,250 T850,140 T1000,200" fill="none" stroke="rgba(251, 191, 36, 0.4)" strokeWidth="1" strokeDasharray="10,5" />
        <path d="M0,300 L50,280 L100,310 L200,220 L250,240 L300,150 L400,180 L500,100 L600,120 L700,40 L800,60 L900,10 L1000,30" fill="none" stroke="#fbbf24" strokeWidth="2" className="indicator-line" />
      </svg>
    </div>
  );
};

// --- Scalping Visual Component ---
const ScalpingTradeVisual = () => {
  return (
    <div className="relative aspect-square sm:aspect-video lg:aspect-square bg-slate-900/40 rounded-[40px] sm:rounded-[72px] border border-white/5 overflow-hidden group p-6 sm:p-12">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      </div>
      <div className="relative h-full flex flex-col justify-end">
        <div className="flex items-end gap-1 sm:gap-2 h-4/5">
          {[40, 45, 42, 50, 48, 55, 30, 60, 65, 62, 75, 70, 85].map((h, i) => (
            <div 
              key={i} 
              className={`flex-1 rounded-t-sm transition-all duration-1000 ${i === 6 ? 'bg-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-amber-500/40'}`}
              style={{ height: `${h}%` }}
            >
              {i === 6 && <div className="absolute -top-12 left-[45%] -translate-x-1/2 bg-red-500 text-[8px] sm:text-[10px] font-black px-2 py-1 rounded text-white whitespace-nowrap z-20">LIQUIDITY GRAB</div>}
              {i === 10 && <div className="absolute -top-12 left-[75%] -translate-x-1/2 bg-amber-500 text-[8px] sm:text-[10px] font-black px-2 py-1 rounded text-slate-950 whitespace-nowrap z-20">BOS</div>}
            </div>
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <svg className="w-full h-full" viewBox="0 0 400 400">
              <path d="M0,250 L120,230 L180,290 L280,150 L400,100" fill="none" stroke="#fbbf24" strokeWidth="3" className="indicator-line opacity-80" />
              <path d="M0,270 L120,260 L180,270 L280,180 L400,140" fill="none" stroke="#3b82f6" strokeWidth="2" className="indicator-line opacity-50" />
              <circle cx="210" cy="225" r="8" fill="#fbbf24" className="animate-pulse" />
           </svg>
        </div>
      </div>
    </div>
  );
};

// --- Swing Visual Component ---
const SwingTradeVisual = () => {
  return (
    <div className="relative aspect-square sm:aspect-video lg:aspect-square bg-slate-900/40 rounded-[40px] sm:rounded-[72px] border border-white/5 overflow-hidden group p-6 sm:p-12">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>
      <div className="relative h-full flex flex-col justify-end">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4 sm:p-10">
           <svg className="w-full h-full" viewBox="0 0 400 400">
              <path d="M0,350 C100,300 150,320 200,150 C250,50 350,100 400,0" fill="none" stroke="#3b82f6" strokeWidth="4" className="indicator-line" />
              <path d="M0,370 C100,320 150,340 200,170 C250,70 350,120 400,20" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="10,10" className="opacity-30" />
              
              <g className="animate-bounce">
                <circle cx="200" cy="150" r="12" fill="#3b82f6" />
                <circle cx="200" cy="150" r="20" stroke="#3b82f6" strokeWidth="2" fill="none" className="animate-ping" />
              </g>
              
              <text x="220" y="160" fill="#3b82f6" className="text-[10px] sm:text-[12px] font-black uppercase tracking-widest">Entry Zone</text>
           </svg>
        </div>
        <div className="flex justify-between items-end h-1/3 opacity-20 gap-1">
           {[20, 30, 25, 40, 35, 50, 45, 60].map((h, i) => (
             <div key={i} className="flex-1 bg-blue-500 rounded-t-lg" style={{ height: `${h}%` }} />
           ))}
        </div>
      </div>
    </div>
  );
};

// --- Detail Page Component ---
const DetailPage = ({ item, onBack }: { item: any, onBack: () => void }) => {
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <div className="min-h-screen bg-slate-950 pt-24 sm:pt-32 pb-16 sm:pb-24 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-amber-500 mb-8 sm:mb-12 uppercase tracking-[0.2em] text-[10px] sm:text-[11px] transition-all font-display font-semibold group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Academy
        </button>
        <div className="glass-panel p-8 sm:p-16 rounded-[40px] sm:rounded-[64px] relative overflow-hidden">
          <h1 className="text-3xl sm:text-6xl md:text-7xl font-display font-black mb-10 tracking-tight gradient-text leading-tight">{item.title}</h1>
          
          <div className="mb-12">
            <AcademyVisual type={item.visualType} />
          </div>

          <div className="space-y-6 sm:space-y-10 text-slate-300 text-base sm:text-xl leading-relaxed font-body whitespace-pre-wrap">{item.fullDescription || item.detail}</div>
          
          <div className="mt-12 sm:mt-24 pt-8 sm:pt-12 border-t border-white/5 flex justify-center">
            <button onClick={onBack} className="w-full sm:w-auto px-12 sm:px-16 py-4 sm:py-6 bg-amber-500 text-slate-950 rounded-2xl font-display font-black text-sm sm:text-lg hover:scale-105 shadow-2xl uppercase tracking-widest transition-transform">Acknowledge</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Philosophy Section ---
const PhilosophySection = () => {
  const revealRef = useScrollReveal();
  return (
    <section className="py-24 sm:py-40 relative z-10" id="philosophy">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={revealRef} className="title-reveal text-center mb-16 sm:mb-32">
          <h2 className="text-4xl sm:text-8xl font-display font-black mb-6 sm:mb-8 leading-tight tracking-tighter uppercase">FX & THE <br className="sm:hidden"/><span className="gradient-text">MISSION</span></h2>
          <div className="w-16 sm:w-24 h-1 sm:h-1.5 bg-amber-500 mx-auto rounded-full mb-8 sm:mb-12"></div>
          <p className="text-lg sm:text-2xl md:text-3xl font-body text-slate-200 max-w-4xl mx-auto leading-relaxed font-bold">
            TRADERs FXは、単なる手法の提供場ではありません。FXを通じて <span className="text-amber-500">ハイインカムスキル</span> を身につけ、個々の真の成長と自由を目指すトレーダーのための学びの場です。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 mb-24">
          <div className="glass-panel p-8 sm:p-12 rounded-[40px] sm:rounded-[56px] border-amber-500/20 hover:border-amber-500/40 transition-all group">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mb-6 sm:mb-8">
              <Key className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-xl sm:text-3xl font-display font-black mb-4 sm:mb-6 uppercase tracking-tight">Why High-Income Skill?</h3>
            <p className="text-slate-300 text-sm sm:text-lg leading-relaxed">
              私たちは今、会社に頼るだけではなく、自分の力でお金を稼ぐ時代に突入しています。<span className="text-white font-black">「個人で稼ぐ力」</span> こそが、真の自立を可能にします。
            </p>
          </div>

          <div className="glass-panel p-8 sm:p-12 rounded-[40px] sm:rounded-[56px] border-amber-500/20 hover:border-amber-500/40 transition-all group">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mb-6 sm:mb-8">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-xl sm:text-3xl font-display font-black mb-4 sm:mb-6 uppercase tracking-tight">Why FX?</h3>
            <p className="text-slate-300 text-sm sm:text-lg leading-relaxed">
              特に <span className="text-amber-500 font-black">XAUUSD（ゴールド）</span> はボラティリティが大きく、戦略的なスキャルピングを習得することで、圧倒的なスピード感で利益を確保できます。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-24">
           {TRADING_ASSETS.map((asset, i) => (
             <div key={i} className="glass-panel p-8 rounded-[40px] border-white/5 hover:border-amber-500/30 transition-all flex flex-col h-full">
                <div className="mb-6">{asset.icon}</div>
                <h4 className="text-xl sm:text-2xl font-display font-black mb-2 text-white">{asset.name}</h4>
                <div className="text-[10px] text-slate-500 font-black uppercase mb-4 tracking-widest">{asset.fullName}</div>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed flex-grow">{asset.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

// --- Main App Component ---
const App: React.FC = () => {
  useInteractiveDynamics();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeAcademyTab, setActiveAcademyTab] = useState<'terminology' | 'advanced' | 'fundamentals'>('terminology');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const scrollToSection = (id: string) => {
    if (selectedItem) setSelectedItem(null);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 50);
    setIsMenuOpen(false);
  };

  const handleBackToAcademy = () => {
    setSelectedItem(null);
    setTimeout(() => {
      const academySection = document.getElementById('academy');
      if (academySection) {
        academySection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  if (selectedItem) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <ChartBackground3D />
        <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5 h-20 sm:h-24 flex items-center px-6">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4 cursor-pointer group" onClick={handleBackToAcademy}>
              <TrendingUp className="text-amber-500 w-8 h-8 sm:w-9 sm:h-9" />
              <span className="text-xl sm:text-3xl font-display font-black uppercase">Traders <span className="text-amber-500">FX</span></span>
            </div>
            <button onClick={handleBackToAcademy} className="px-6 py-2 sm:px-8 sm:py-3 bg-white/5 border border-white/10 rounded-full font-display font-black text-[10px] sm:text-[11px] uppercase tracking-widest">Exit</button>
          </div>
        </nav>
        <DetailPage item={selectedItem} onBack={handleBackToAcademy} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500/40 overflow-x-hidden">
      <ChartBackground3D />
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5 h-20 sm:h-24 flex items-center px-4 sm:px-8">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4 cursor-pointer group" onClick={() => scrollToSection('home')}>
            <TrendingUp className="text-amber-500 w-8 h-8 sm:w-10 sm:h-10" />
            <span className="text-lg sm:text-3xl font-display font-black uppercase">Traders <span className="text-amber-500">FX</span></span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-[11px] font-display font-black tracking-[0.2em] uppercase">
            <button onClick={() => scrollToSection('philosophy')} className="hover:text-amber-500 transition-colors">Mission</button>
            <button onClick={() => scrollToSection('scalping')} className="hover:text-amber-500 transition-colors">Scalping</button>
            <button onClick={() => scrollToSection('swing')} className="hover:text-amber-500 transition-colors">Swing</button>
            <button onClick={() => scrollToSection('academy')} className="hover:text-amber-500 transition-colors">Academy</button>
            <a href={APP_LINKS[2].url} target="_blank" className="px-8 py-4 bg-amber-500 text-slate-950 rounded-full hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/30">JOIN HUB</a>
          </div>
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <header id="home" className="relative pt-32 pb-16 sm:pt-64 sm:pb-48 flex items-center justify-center min-h-[85vh] sm:min-h-screen overflow-hidden">
        <div className="hero-scrim" />
        <HeroChartOverlay />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 sm:gap-4 px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-500 text-[8px] sm:text-[11px] font-display font-black mb-8 sm:mb-14 uppercase tracking-[0.2em] sm:tracking-[0.4em] animate-float">
            <Sparkles className="w-3 h-3 sm:w-5 sm:h-5" />
            <span>ELITE TRADING COMMUNITY</span>
          </div>
          <h1 className="text-[clamp(4rem,15vw,12rem)] font-display font-black mb-8 leading-[0.85] tracking-tight uppercase">
            <span className="gradient-text">BE A</span> <br />
            TRADER
          </h1>
          <p className="text-xl sm:text-5xl font-display font-black text-white mb-10 tracking-tight drop-shadow-2xl">トレードで真の自由を。</p>
          <button onClick={() => scrollToSection('philosophy')} className="px-10 py-5 sm:px-20 sm:py-8 bg-amber-500 text-slate-950 rounded-2xl sm:rounded-3xl font-display font-black text-base sm:text-2xl hover:scale-105 shadow-2xl transition-all uppercase tracking-widest">GET STARTED</button>
        </div>
      </header>

      <PhilosophySection />

      <section id="scalping" className="py-24 sm:py-40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedTitle className="text-center mb-16 sm:mb-32">
            <h2 className="text-5xl sm:text-8xl font-display font-black tracking-tighter uppercase leading-[0.85]">Scalping <br /><span className="gradient-text">Protocol</span></h2>
          </AnimatedTitle>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 items-center">
            <div className="glass-panel p-8 sm:p-16 rounded-[40px] border-amber-500/20 relative overflow-hidden">
               <h3 className="text-2xl sm:text-4xl font-display font-black tracking-tight uppercase mb-8">Efficiency First</h3>
               <p className="text-slate-300 text-base sm:text-xl mb-8 leading-relaxed">10〜20pipsの利確を淡々と繰り返す、時間効率を追求したスキャルピング戦略。</p>
               <button onClick={() => setSelectedItem({ ...STRATEGY_STEPS[0], title: 'スキャルピング・プロトコル' })} className="px-8 py-4 bg-amber-600 text-white rounded-xl font-display font-black text-[10px] uppercase tracking-widest hover:bg-amber-500">Details</button>
            </div>
            <ScalpingTradeVisual />
          </div>
        </div>
      </section>

      <section id="academy" className="py-24 sm:py-48">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedTitle className="text-center mb-16 sm:mb-32">
            <h2 className="text-4xl sm:text-[8rem] font-display font-black mb-6 uppercase tracking-tighter">Trader <span className="text-amber-500">Academy</span></h2>
          </AnimatedTitle>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-16 font-display">
            {['terminology', 'advanced', 'fundamentals'].map((tab) => (
              <button key={tab} onClick={() => setActiveAcademyTab(tab as any)} className={`px-8 py-4 sm:px-16 sm:py-5 rounded-2xl font-black uppercase text-[10px] sm:text-[12px] tracking-widest transition-all border-2 ${activeAcademyTab === tab ? 'bg-amber-500 border-amber-500 text-slate-950 scale-105' : 'bg-slate-900 border-white/5 text-slate-500 hover:border-white/20'}`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ACADEMY_CONTENT[activeAcademyTab].map((item, i) => (
              <div key={i} onClick={() => setSelectedItem(item)} className="glass-panel p-10 rounded-[40px] border border-white/5 hover:border-amber-500/50 transition-all cursor-pointer group">
                <h4 className="text-2xl sm:text-3xl font-display font-black mb-6 text-amber-500 group-hover:translate-x-2 transition-transform">{item.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-24 border-t border-white/5 relative z-10 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-8 text-center text-slate-500 text-[10px] font-body">
          <TrendingUp className="text-amber-500 w-8 h-8 mx-auto mb-6" />
          © 2025 TRADERS FX. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
};

export default App;
