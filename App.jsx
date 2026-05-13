// App.jsx — main shell. Edit page structure here.

const App = () => {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const T = THEMES[tweaks.theme] || THEMES.dark;
  const A = ACCENTS[tweaks.accent] || ACCENTS.lime;
  const lang = tweaks.lang === 'en' ? 'en' : 'es';
  const t = (window.TRANSLATIONS && window.TRANSLATIONS[lang]) || {};
  const toggleLang = () => setTweak('lang', lang === 'es' ? 'en' : 'es');

  return (
    <div style={{
      background: T.bg, color: T.text, minHeight: '100vh',
      fontFamily: "'Inter Tight', ui-sans-serif, system-ui",
      fontFeatureSettings: '"ss01", "cv11"',
    }}>
      <style>{`
        :root { --acc: ${A.c}; --acc-soft: ${A.soft}; --bg: ${T.bg}; --bg2: ${T.bg2}; --line: ${T.line}; --text: ${T.text}; --dim: ${T.dim}; }
        body { margin: 0; }
        a { color: inherit; text-decoration: none; }
        ::selection { background: var(--acc); color: ${A.ink}; }
        .mono { font-family: 'JetBrains Mono', ui-monospace, monospace; font-feature-settings: "calt", "ss01"; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-8px) rotate(2deg); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(2000px); } }
        @keyframes drift { 0% { transform: translate(0, 0); } 50% { transform: translate(30px, -20px); } 100% { transform: translate(0, 0); } }
        @keyframes rotate-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orb-1 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(60px, -40px) scale(1.15); } }
        @keyframes orb-2 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-50px, 30px) scale(0.9); } }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes textGlow { 0%, 100% { text-shadow: 0 0 10px ${A.c}80; } 50% { text-shadow: 0 0 20px ${A.c}, 0 0 30px ${A.c}60; } }
        .reveal { animation: slideUp .6s ease-out backwards; }
        .shimmer-text {
          background: linear-gradient(90deg, var(--text) 0%, var(--acc) 50%, var(--text) 100%);
          background-size: 200% auto; background-clip: text; -webkit-background-clip: text;
          -webkit-text-fill-color: transparent; animation: shimmer 4s linear infinite;
        }
        .hover-lift { transition: transform .3s cubic-bezier(.2,.7,.3,1), border-color .3s, background .3s, box-shadow .3s; perspective: 1000px; }
        .hover-lift:hover { transform: translateY(-4px); border-color: var(--acc) !important; box-shadow: 0 20px 40px -20px rgba(0,0,0,.5); }
        .arrow-link { display: inline-block; transition: transform .25s; }
        .hover-lift:hover .arrow-link { transform: translate(4px, -4px); color: var(--acc); }
        .magnet-btn { position: relative; overflow: hidden; transition: all .3s; }
        .magnet-btn::before { content: ''; position: absolute; inset: 0; background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,.3) 50%, transparent 70%); transform: translateX(-100%); transition: transform .6s; }
        .magnet-btn:hover::before { transform: translateX(100%); }
        .magnet-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 25px -5px currentColor; }
        button { transition: all .2s ease; }
        button:active { transform: scale(0.98); }
        input, textarea { transition: border-color .2s, box-shadow .2s; }
        details summary { list-style: none; }
        details summary::-webkit-details-marker { display: none; }
        input::placeholder, textarea::placeholder { color: ${T.dim}; opacity: .7; }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      {tweaks.showGrid && <BackgroundGrid line={T.line} />}
      <ScrollIndicators T={T} A={A} />
      <Nav T={T} A={A} t={t} lang={lang} toggleLang={toggleLang} />
      <main>
        <Hero T={T} A={A} t={t} lang={lang} showLogo={tweaks.showLogoHero} />
        <About T={T} A={A} t={t} />
        {tweaks.showStatusBar && <StatusBar T={T} A={A} t={t} />}
        <Services T={T} A={A} t={t} />
        <Portfolio T={T} A={A} t={t} />
        <CodeShowcase T={T} A={A} t={t} />
        <Stack T={T} A={A} t={t} />
        <Process T={T} A={A} t={t} />
        <Work T={T} A={A} t={t} />
        <Pricing T={T} A={A} t={t} />
        <FAQ T={T} A={A} t={t} />
        <Contact T={T} A={A} t={t} />
      </main>
      <Footer T={T} A={A} t={t} role="contentinfo" />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Apariencia">
          <TweakRadio label="Tema" value={tweaks.theme} onChange={v => setTweak('theme', v)}
            options={[{value: 'dark', label: 'Dark'}, {value: 'light', label: 'Light'}]} />
          <TweakSelect label="Acento" value={tweaks.accent} onChange={v => setTweak('accent', v)}
            options={[
              {value: 'lime', label: 'Lime'},
              {value: 'blue', label: 'Blue'},
              {value: 'violet', label: 'Violet'},
              {value: 'amber', label: 'Amber'},
            ]} />
        </TweakSection>
        <TweakSection title="Detalles">
          <TweakToggle label="Logo en hero" value={tweaks.showLogoHero} onChange={v => setTweak('showLogoHero', v)} />
          <TweakToggle label="Grid de fondo" value={tweaks.showGrid} onChange={v => setTweak('showGrid', v)} />
          <TweakToggle label="Status bar" value={tweaks.showStatusBar} onChange={v => setTweak('showStatusBar', v)} />
        </TweakSection>
        <TweakSection title="Idioma / Language">
          <TweakRadio label="Idioma" value={tweaks.lang} onChange={v => setTweak('lang', v)}
            options={[{value: 'es', label: 'ES'}, {value: 'en', label: 'EN'}]} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
};


ReactDOM.createRoot(document.getElementById('root')).render(<App />);
