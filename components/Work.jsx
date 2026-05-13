// Work.jsx
// Component: <Work/>. Receives T (theme), A (accent), t (translations) as props where used.

const { useState, useRef, useEffect } = React;

const Work = ({ T, A, t }) => {
  const projects = [
    {
      name: t.wk_1_name,
      kind: t.wk_1_kind,
      industry: t.wk_1_industry,
      desc: t.wk_1_desc,
      stack: ['PostgreSQL', 'FastAPI', 'Python', 'AWS RDS'],
      stats: [
        [t.wk_1_s1, '2,000+'],
        [t.wk_1_s2, '99.98%'],
        [t.wk_1_s3, 'AES-256'],
      ],
      mock: 'db',
    },
    {
      name: t.wk_2_name,
      kind: t.wk_2_kind,
      industry: t.wk_2_industry,
      desc: t.wk_2_desc,
      stack: ['FastAPI', 'PostgreSQL', 'React', 'Pandas'],
      stats: [
        [t.wk_2_s1, '98.4%'],
        [t.wk_2_s2, '12K+'],
        [t.wk_2_s3, '−85%'],
      ],
      mock: 'bank',
    },
    {
      name: t.wk_3_name,
      kind: t.wk_3_kind,
      industry: t.wk_3_industry,
      desc: t.wk_3_desc,
      stack: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
      stats: [
        [t.wk_3_s1, '15+'],
        [t.wk_3_s2, '95/100'],
        [t.wk_3_s3, '100%'],
      ],
      mock: 'web',
    },
    {
      name: t.wk_4_name,
      kind: t.wk_4_kind,
      industry: t.wk_4_industry,
      desc: t.wk_4_desc,
      stack: ['React', 'Node.js', 'PostgreSQL', 'API REST'],
      stats: [
        [t.wk_4_s1, '500+'],
        [t.wk_4_s2, '85%'],
        [t.wk_4_s3, '+40%'],
      ],
      mock: 'web',
    },
  ];

  // Gold-aligned mock backgrounds — all use accent color so it ties to the rest of the page
  const Mock = ({ kind }) => {
    if (kind === 'db') {
      return (
        <svg viewBox="0 0 400 240" style={{ width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id="m-db-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={T.bg3}/>
              <stop offset="100%" stopColor={T.bg}/>
            </linearGradient>
            <radialGradient id="m-db-glow" cx="50%" cy="50%">
              <stop offset="0%" stopColor={A.c} stopOpacity="0.25"/>
              <stop offset="100%" stopColor={A.c} stopOpacity="0"/>
            </radialGradient>
          </defs>
          <rect width="400" height="240" fill="url(#m-db-bg)"/>
          <rect width="400" height="240" fill="url(#m-db-glow)"/>
          {/* grid */}
          <g stroke={A.c} strokeOpacity="0.06" strokeWidth="0.5">
            {[...Array(10)].map((_, i) => <line key={'v'+i} x1={i*40} y1="0" x2={i*40} y2="240"/>)}
            {[...Array(7)].map((_, i) => <line key={'h'+i} x1="0" y1={i*40} x2="400" y2={i*40}/>)}
          </g>
          {/* Database cylinders */}
          {[0, 1, 2].map(i => {
            const colors = ['#8b5cf6', '#ec4899', '#06b6d4'];
            return (
            <g key={i} transform={`translate(${80 + i * 90}, 60)`}>
              <ellipse cx="40" cy="0" rx="36" ry="8" fill={colors[i]} fillOpacity="0.3"/>
              <rect x="4" y="0" width="72" height="100" fill={colors[i]} fillOpacity="0.18"/>
              <ellipse cx="40" cy="100" rx="36" ry="8" fill={colors[i]} fillOpacity="0.5"/>
              <ellipse cx="40" cy="0" rx="36" ry="8" fill="none" stroke={colors[i]} strokeWidth="1.5"/>
              <ellipse cx="40" cy="30" rx="36" ry="8" fill="none" stroke={colors[i]} strokeOpacity="0.5" strokeWidth="1"/>
              <ellipse cx="40" cy="60" rx="36" ry="8" fill="none" stroke={colors[i]} strokeOpacity="0.5" strokeWidth="1"/>
              {/* connecting line */}
              {i < 2 && <line x1="76" y1="50" x2="94" y2="50" stroke={colors[i]} strokeWidth="1.5" strokeDasharray="2 2"/>}
            </g>
          );
          })}
          {/* Lock badge */}
          <g transform="translate(180, 188)">
            <rect x="0" y="6" width="40" height="28" rx="4" fill={A.c}/>
            <path d="M 6 6 L 6 0 Q 6 -8 14 -8 L 26 -8 Q 34 -8 34 0 L 34 6" stroke={A.c} strokeWidth="3" fill="none"/>
            <circle cx="20" cy="20" r="3" fill="#000"/>
          </g>
          <text x="20" y="225" fontFamily="JetBrains Mono, monospace" fontSize="9" fill={A.c} opacity="0.7">SELECT * FROM clients WHERE active = true LIMIT 2000;</text>
        </svg>
      );
    }
    if (kind === 'bank') {
      return (
        <svg viewBox="0 0 400 240" style={{ width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id="m-bk-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={T.bg3}/>
              <stop offset="100%" stopColor={T.bg}/>
            </linearGradient>
            <radialGradient id="m-bk-glow" cx="50%" cy="50%">
              <stop offset="0%" stopColor={A.c} stopOpacity="0.2"/>
              <stop offset="100%" stopColor={A.c} stopOpacity="0"/>
            </radialGradient>
          </defs>
          <rect width="400" height="240" fill="url(#m-bk-bg)"/>
          <rect width="400" height="240" fill="url(#m-bk-glow)"/>
          {/* Two columns reconciling */}
          <g transform="translate(30, 30)">
            <text fontFamily="JetBrains Mono, monospace" fontSize="9" fill={A.c} opacity="0.8" letterSpacing="1">{t.wk_mock_bank_l}</text>
            {[0,1,2,3,4].map(i => {
              const colors = ['#8b5cf6', '#ec4899', '#06b6d4', '#14b8a6', '#f59e0b'];
              return (
              <g key={i}>
                <rect x="0" y={20 + i * 28} width="140" height="20" rx="3" fill={colors[i]} fillOpacity={0.08 + i * 0.04}/>
                <rect x="6" y={26 + i * 28} width="40" height="8" rx="2" fill={colors[i]} fillOpacity={0.4}/>
                <rect x="100" y={26 + i * 28} width="32" height="8" rx="2" fill={colors[i]} fillOpacity={0.3}/>
              </g>
              );
            })}
          </g>
          <g transform="translate(230, 30)">
            <text fontFamily="JetBrains Mono, monospace" fontSize="9" fill={A.c} opacity="0.8" letterSpacing="1">{t.wk_mock_bank_r}</text>
            {[0,1,2,3,4].map(i => {
              const colors = ['#8b5cf6', '#ec4899', '#06b6d4', '#14b8a6', '#f59e0b'];
              return (
              <g key={i}>
                <rect x="0" y={20 + i * 28} width="140" height="20" rx="3" fill={colors[i]} fillOpacity={0.08 + i * 0.04}/>
                <rect x="6" y={26 + i * 28} width="40" height="8" rx="2" fill={colors[i]} fillOpacity={0.4}/>
                <rect x="100" y={26 + i * 28} width="32" height="8" rx="2" fill={colors[i]} fillOpacity={0.3}/>
              </g>
              );
            })}
          </g>
          {/* Connection lines with travelling dots */}
          {[0,1,2,3,4].map(i => {
            const colors = ['#8b5cf6', '#ec4899', '#06b6d4', '#14b8a6', '#f59e0b'];
            return (
            <g key={i}>
              <line x1="170" y1={60 + i * 28} x2="230" y2={60 + i * 28} stroke={colors[i]} strokeWidth="1.5" strokeDasharray={i === 2 ? "0" : "2 2"} opacity={i === 2 ? 0.4 : 0.9}/>
              {i !== 2 && <circle r="2" fill={colors[i]}>
                <animateMotion dur={`${2 + i * 0.3}s`} repeatCount="indefinite" path={`M 170 ${60 + i * 28} L 230 ${60 + i * 28}`}/>
              </circle>}
            </g>
            );
          })}
          {/* Match indicator */}
          <g transform="translate(180, 200)">
            <rect x="0" y="0" width="40" height="20" rx="10" fill={A.c}/>
            <text x="20" y="14" fontFamily="JetBrains Mono, monospace" fontSize="10" fill={A.ink} textAnchor="middle" fontWeight="700">98.4%</text>
          </g>
        </svg>
      );
    }
    // web
    return (
      <svg viewBox="0 0 400 240" style={{ width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="m-wb-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={T.bg3}/>
            <stop offset="100%" stopColor={T.bg}/>
          </linearGradient>
          <radialGradient id="m-wb-glow" cx="30%" cy="40%">
            <stop offset="0%" stopColor={A.c} stopOpacity="0.18"/>
            <stop offset="100%" stopColor={A.c} stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="240" fill="url(#m-wb-bg)"/>
        <rect width="400" height="240" fill="url(#m-wb-glow)"/>
        {/* Browser window */}
        <g transform="translate(40, 30)">
          <rect width="320" height="180" rx="6" fill="#000" fillOpacity="0.45" stroke={A.c} strokeOpacity="0.5"/>
          <rect width="320" height="22" rx="6" fill={A.c} fillOpacity="0.18"/>
          <circle cx="12" cy="11" r="3" fill="#ff5f57"/>
          <circle cx="24" cy="11" r="3" fill="#febc2e"/>
          <circle cx="36" cy="11" r="3" fill="#28c840"/>
          <rect x="80" y="6" width="160" height="11" rx="3" fill={A.c} fillOpacity="0.15"/>
          {/* page content */}
          <rect x="20" y="40" width="120" height="14" rx="2" fill="#8b5cf6" fillOpacity="0.85"/>
          <rect x="20" y="60" width="200" height="6" rx="2" fill="#ec4899" fillOpacity="0.35"/>
          <rect x="20" y="72" width="180" height="6" rx="2" fill="#06b6d4" fillOpacity="0.25"/>
          <rect x="20" y="92" width="60" height="20" rx="4" fill="#14b8a6"/>
          <rect x="220" y="40" width="80" height="80" rx="4" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeOpacity="0.4"/>
          {/* card grid */}
          <rect x="20" y="130" width="86" height="36" rx="3" fill="#8b5cf6" fillOpacity="0.1" stroke="#8b5cf6" strokeOpacity="0.2"/>
          <rect x="116" y="130" width="86" height="36" rx="3" fill="#ec4899" fillOpacity="0.1" stroke="#ec4899" strokeOpacity="0.2"/>
          <rect x="212" y="130" width="86" height="36" rx="3" fill="#06b6d4" fillOpacity="0.1" stroke="#06b6d4" strokeOpacity="0.2"/>
        </g>
      </svg>
    );
  };

  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (containerRef.current) {
      GsapUtils.staggerCards(containerRef.current, '.work-card');
      cardsRef.current.forEach(card => {
        if (card) GsapUtils.cardHover3D(card);
      });
    }
  }, []);

  return (
    <section id="trabajos" style={{ padding: '120px 0', borderTop: `1px solid ${T.line}`, position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 400, borderRadius: '50%',
        background: `radial-gradient(ellipse, ${A.soft}, transparent 70%)`,
        filter: 'blur(80px)', pointerEvents: 'none', opacity: 0.6,
      }} />
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 48, marginBottom: 64, alignItems: 'flex-end' }}>
          <div>
            <div className="mono" style={{ fontSize: 12, color: A.c, marginBottom: 12, letterSpacing: 1 }}>// SECTION 05</div>
            <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 600, letterSpacing: -2, lineHeight: 1, margin: 0 }}>
              {t.wk_title_a}<br />{t.wk_title_b}
            </h2>
          </div>
          <p style={{ fontSize: 17, color: T.dim, lineHeight: 1.55, margin: 0, maxWidth: 540, justifySelf: 'flex-end' }}>
            {t.wk_intro}
          </p>
        </div>

        <div ref={containerRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {projects.map((p, i) => (
            <a
              key={p.name}
              href="#"
              ref={el => cardsRef.current[i] = el}
              className="hover-lift work-card"
              style={{
              border: `1px solid ${T.line2}`, borderRadius: 14, overflow: 'hidden',
              background: T.bg2, display: 'flex', flexDirection: 'column',
              cursor: 'pointer', position: 'relative',
              boxShadow: `0 20px 40px -20px rgba(0,0,0,.5)`,
            }}>
              {/* corner accent */}
              <div style={{
                position: 'absolute', top: 0, right: 0, width: 80, height: 80,
                background: `radial-gradient(circle at top right, ${A.soft}, transparent 60%)`,
                pointerEvents: 'none', zIndex: 0,
              }} />
              <div style={{
                aspectRatio: '5/3', position: 'relative', overflow: 'hidden',
                borderBottom: `1px solid ${T.line}`,
              }}>
                <Mock kind={p.mock} />
                {/* Top scan line */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: `linear-gradient(90deg, transparent, ${A.c}, transparent)`,
                  opacity: 0.6,
                }} />
                <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', gap: 6 }}>
                  <span className="mono" style={{
                    fontSize: 10, padding: '4px 8px', borderRadius: 4,
                    background: 'rgba(0,0,0,0.65)', color: T.text,
                    border: `1px solid ${T.line2}`, backdropFilter: 'blur(8px)',
                  }}>{p.kind}</span>
                </div>
                <div style={{ position: 'absolute', top: 14, right: 14 }}>
                  <span className="mono" style={{
                    fontSize: 10, padding: '4px 8px', borderRadius: 4, color: A.c,
                    background: 'rgba(0,0,0,0.65)', border: `1px solid ${A.c}`, backdropFilter: 'blur(8px)',
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    boxShadow: `0 0 12px -2px ${A.c}`,
                  }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: A.c, animation: 'pulse 2s infinite' }} />
                    LIVE
                  </span>
                </div>
              </div>

              <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 14, flex: 1, position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontSize: 24, fontWeight: 600, letterSpacing: -0.8, margin: 0, color: T.text }}>{p.name}</h3>
                <p style={{ fontSize: 13, color: T.dim, lineHeight: 1.55, margin: 0 }}>{p.desc}</p>

                {/* Stats row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, padding: '14px 0', borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}` }}>
                  {p.stats.map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <span className="mono" style={{ fontSize: 9, color: T.dim, letterSpacing: 0.5, textTransform: 'uppercase' }}>{k}</span>
                      <span style={{ fontSize: 16, fontWeight: 600, color: A.c, letterSpacing: -0.5 }}>{v}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 'auto' }}>
                  {p.stack.map(s => (
                    <span key={s} className="mono" style={{
                      fontSize: 10, color: T.dim, padding: '3px 7px',
                      border: `1px solid ${T.line}`, borderRadius: 4, background: T.bg,
                    }}>{s}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                  <span className="mono" style={{ fontSize: 11, color: T.dim }}>{p.industry}</span>
                  <span className="arrow-link" style={{ color: A.c, fontSize: 14, fontWeight: 600 }}>{t.wk_view} ↗</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
};

