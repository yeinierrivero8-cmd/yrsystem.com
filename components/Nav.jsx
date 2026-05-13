// Nav.jsx
// Component: <Nav/>. Receives T (theme), A (accent), t (translations) as props where used.

const { useState, useRef, useEffect } = React;

const Nav = ({ T, A, t, lang, toggleLang }) => {
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (navRef.current) {
        gsap.to(navRef.current, {
          boxShadow: window.scrollY > 20 ? `0 10px 30px -10px rgba(0,0,0,0.3)` : 'none',
          duration: 0.3,
        });
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
  <header ref={navRef} style={{
    position: 'sticky', top: 0, zIndex: 50,
    background: T.chrome, backdropFilter: 'blur(20px)',
    borderBottom: `1px solid ${T.line}`,
  }}>
    <Container>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <img src="logo.png" alt="YR" style={{ height: 28, objectFit: 'contain', borderRadius: 4 }} />
          <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: -0.2 }}>YR System</span>
          <span className="mono" style={{ fontSize: 11, color: T.dim, marginLeft: 4, padding: '2px 6px', border: `1px solid ${T.line}`, borderRadius: 4 }}>v2.4</span>
        </a>
        <nav style={{ display: 'flex', gap: 32 }}>
          {[
            [t.nav_services, 'servicios'],
            [t.nav_stack, 'stack'],
            [t.nav_process, 'proceso'],
            [t.nav_work, 'trabajos'],
            [t.nav_pricing, 'pricing'],
          ].map(([label, slug]) => (
            <a key={slug} href={`#${slug}`} style={{ fontSize: 14, color: T.dim, fontWeight: 500 }}>{label}</a>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={toggleLang} className="mono" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 10px', background: 'transparent', cursor: 'pointer',
            border: `1px solid ${T.line2}`, borderRadius: 6,
            fontSize: 11, fontWeight: 600, letterSpacing: 1, color: T.text,
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            <span style={{ color: lang === 'es' ? A.c : T.dim }}>ES</span>
            <span style={{ color: T.dim }}>/</span>
            <span style={{ color: lang === 'en' ? A.c : T.dim }}>EN</span>
          </button>
          <a href="#" style={{ fontSize: 14, color: T.dim, fontWeight: 500 }}>{t.nav_login}</a>
          <a href="#contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '8px 14px', background: A.c, color: A.ink,
            borderRadius: 6, fontSize: 13, fontWeight: 600,
          }}>
            {t.nav_start} <span>→</span>
          </a>
        </div>
      </div>
    </Container>
  </header>
  );
};

