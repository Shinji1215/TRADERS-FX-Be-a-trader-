
import React from 'react';
import { TrendingUp, Shield, BookOpen, Brain, Download, Layers, Clock, AlertTriangle, HelpCircle, Zap, Target, BarChart3, Info } from 'lucide-react';

export const MARKET_SESSIONS = [
  { 
    name: 'プリロンドン (Pre-London)', 
    summer: '15:00 - 16:00', 
    winter: '16:00 - 17:00', 
    color: 'bg-blue-400', 
    note: '欧州勢の参入開始。ボラティリティの助走時間。' 
  },
  { 
    name: 'ロンドン (London)', 
    summer: '16:00 - 01:00', 
    winter: '17:00 - 02:00', 
    color: 'bg-blue-600', 
    note: '世界最大の取引量。トレンド形成の本番。' 
  },
  { 
    name: 'ニューヨーク (New York)', 
    summer: '21:00 - 06:00', 
    winter: '22:00 - 07:00', 
    color: 'bg-amber-500', 
    note: '米国指標発表。ゴールドが最も荒れる時間帯。' 
  },
  { 
    name: 'NYSE (NYオープン)', 
    summer: '22:30 - 05:00', 
    winter: '23:30 - 06:00', 
    color: 'bg-orange-600', 
    note: '現物株オープン。XAUUSDや指指数が爆発的に動く。' 
  },
];

export const TRADING_ASSETS = [
  {
    name: 'XAUUSD',
    fullName: 'Gold / US Dollar',
    desc: '「金」は圧倒的なボラティリティを誇る究極の銘柄。1分間で10-20pips動くことも珍しくなく、短期間でハイインカムを狙うスキャルピングに最も適しています。',
    icon: <Zap className="text-amber-500 w-8 h-8" />
  },
  {
    name: 'US30',
    fullName: 'Dow Jones 30',
    desc: '米国主要30社の株価指数。トレンドの継続性が高く、押し目買い・戻り売りが機能しやすい銘柄です。',
    icon: <BarChart3 className="text-blue-500 w-8 h-8" />
  },
  {
    name: 'US100',
    fullName: 'NASDAQ 100',
    desc: 'ハイテク企業中心の指数。金利動向やCPIに非常に敏感で、テクニカル分析が素直に機能しやすい側面を持ちます。',
    icon: <Target className="text-emerald-500 w-8 h-8" />
  }
];

export const STRATEGY_STEPS = [
  { 
    title: '流動性狩り (Liquidity Grab)', 
    description: '大口投資家が個人トレーダーの損切りを巻き込み、反転の力を蓄える動きを特定します。',
    detail: '初心者の「損切り」は大口の「燃料」。この仕組みを理解すれば、相場の裏側が見えてくる。',
    icon: <AlertTriangle className="text-amber-500" />,
    visualType: 'liquidity',
    fullDescription: `「大衆が絶望する場所、そこがプロの入り口だ。」
相場を動かすスマートマネーは、自分たちの注文を約定させるために、大量の損切り注文を「燃料」として利用する。ラインを一時的に突破させて大衆を振り落とすこの動きを見極めることが勝利への第一歩だ。`
  },
  { 
    title: 'EMAクロス (Moving Average)', 
    description: '8MAと50MAのクロスを確認。短期的なトレンドの転換と勢いを視覚的に判断。',
    detail: '2本の移動平均線が描く「黄金の交差」。トレンドの「質」と「勢い」を瞬時に見極める。',
    icon: <TrendingUp className="text-emerald-500" />,
    visualType: 'ema',
    fullDescription: `「勢い」の8EMAと「方向」の50EMA。これらが交差する瞬間、相場のパワーバランスが変化する。単なるクロスではなく、50EMAに引き付けられてからの反発を狙うのがプロのやり方だ。`
  },
  { 
    title: 'BOS (Break of Structure)', 
    description: '構造の破壊を確認。直近高値・安値を更新したタイミングで、自信を持ってエントリー。',
    detail: 'トレンド継続の最終確認。相場の「階段」が一段上がった、あるいは下がった瞬間を捉える。',
    icon: <Layers className="text-blue-500" />,
    visualType: 'bos',
    fullDescription: `価格が直近の高値や安値を明確に突破した時、それは「今のトレンドを継続する」という意思表示だ。このBOSを確認することで、自信を持って順張りを仕掛けることができる。`
  },
];

export const APP_LINKS = [
  { name: 'Exness', url: 'https://www.exness.com/', desc: '業界最狭スプレッド。' },
  { name: 'TradingView', url: 'https://www.tradingview.com/', desc: '世界最高のチャートツール。' },
  { name: 'Discord Community', url: 'https://discord.com/', desc: '仲間と情報共有。' }
];

export const ACADEMY_CONTENT = {
  terminology: [
    { 
      title: 'ロウソク足', 
      detail: '相場の心拍数。4つの価格が織りなす「買いと売りの攻防」の記録。',
      visualType: 'candles',
      fullDescription: `チャートの基本。始値、高値、安値、終値から相場の心理を読み解く。ヒゲの長さは拒絶の強さを、実体の大きさは勢いを表す。`
    },
    { 
      title: 'レジサポライン & 需給', 
      detail: '相場に潜む「壁」。注文が集中するエリアを見極める。',
      visualType: 'res-sup',
      fullDescription: `レジスタンス（抵抗線）とサポート（支持線）。一度突破された壁が逆の役割を果たす「ロールリバーサル」は、エントリーの最重要ポイントだ。`
    },
    { 
      title: 'TP (利確) & SL (損切り)', 
      detail: 'トレードの命綱。出口戦略こそがプロとアマの境界線。',
      visualType: 'tp-sl',
      fullDescription: `エントリー前に出口を決める。SLは資金を守る防衛線、TPは欲をコントロールする目標点。リスクリワード1:1.5以上を徹底せよ。`
    },
    { 
      title: 'スプレッド (Spread)', 
      detail: '目に見えない通行料。勝負はマイナスから始まる。',
      visualType: 'spread',
      fullDescription: `買値(Ask)と売値(Bid)の差。エントリーした瞬間に発生するコストであり、スキャルピングにおいては業者の選定が勝敗に直結する。`
    },
  ],
  advanced: [
    { 
      title: 'スリングショット (Slingshot)', 
      detail: '罠を逆手に取る。流動性を奪ってから一気に加速する必勝パターン。',
      visualType: 'slingshot',
      fullDescription: `パチンコのように一度逆方向に力を溜めてから加速する動き。ダマシを待って、大口と同じ方向に飛び乗る高度な戦略。`
    },
    { 
      title: 'ダウ理論', 
      detail: '相場の聖書。トレンドの「継続」と「転換」を見極めるための羅針盤。',
      visualType: 'dow',
      fullDescription: `高値・安値の切り上げ（上昇トレンド）と切り下げ（下降トレンド）。明確な転換サインが出るまでトレンドは継続するという大原則。`
    },
    { 
      title: 'スマートマネー', 
      detail: 'クジラの足跡を追え。銀行やファンドの「大口注文」に便乗する。',
      visualType: 'smc',
      fullDescription: `機関投資家の注文が入った痕跡をチャートの「歪み」から特定する。個人ではなく大口の視点を持つことが真の勝利に繋がる。`
    },
  ],
  fundamentals: [
    { 
      title: 'CPI (消費者物価指数)', 
      detail: 'インフレの体温計。ドルを動かし、ゴールドを乱高下させる。',
      visualType: 'volatility',
      fullDescription: `インフレ動向を示す最重要指標。予想値との乖離が、ゴールドなどのボラティリティを爆発的に高める。`
    },
    { 
      title: '米国雇用統計 (NFP)', 
      detail: '月一度のメインイベント。世界中の資金が集中する最高ボラティリティ。',
      visualType: 'volatility',
      fullDescription: `毎月第1金曜日。米国経済の健全性を示す最大の指標。発表直後のカオスな値動きを理解し、方向性が固まった後を狙う。`
    },
    { 
      title: 'ADP雇用統計', 
      detail: '前哨戦。本番の2日前に発表される雇用統計のヒント。',
      visualType: 'volatility',
      fullDescription: `民間企業による雇用データ。週末のNFPに向けた市場の期待値を調整する指標として機能する。`
    },
  ],
};
