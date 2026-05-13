// StatusBar.jsx
// Component: <StatusBar/>. Receives T (theme), A (accent), t (translations) as props where used.

const StatusBar = ({ T, A, t }) => (
  <section style={{ borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}`, background: T.bg2, overflow: 'hidden' }}>
    <Container>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[
          [t.sb_projects, 10, '', t.sb_projects_sub],
          [t.sb_uptime, 99.97, '%', t.sb_uptime_sub],
          [t.sb_latency, 200, 'ms', t.sb_latency_sub],
          [t.sb_clients, 12, '', 'en USA'],
        ].map(([k, v, suf, sub], i) => (
          <div key={k} className="hover-lift" style={{
            padding: '28px', cursor: 'default',
            borderLeft: i > 0 ? `1px solid ${T.line}` : 'none',
            display: 'flex', flexDirection: 'column', gap: 4,
            border: `1px solid transparent`, borderLeft: i > 0 ? `1px solid ${T.line}` : '1px solid transparent',
          }}>
            <div className="mono" style={{ fontSize: 11, color: T.dim, letterSpacing: 0.5 }}>{k}</div>
            <div style={{ fontSize: 36, fontWeight: 600, letterSpacing: -1.5, color: T.text }}>
              {i === 2 ? <>&lt;<Counter to={v} suffix={suf} T={T} /></> : <Counter to={v} suffix={suf} T={T} />}
            </div>
            <div className="mono" style={{ fontSize: 11, color: A.c }}>{sub}</div>
          </div>
        ))}
      </div>
    </Container>
    {/* Marquee tech ticker */}
    <div style={{ borderTop: `1px solid ${T.line}`, padding: '16px 0', overflow: 'hidden', position: 'relative', maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}>
      <div style={{ display: 'flex', gap: 48, animation: 'ticker 40s linear infinite', whiteSpace: 'nowrap', width: 'max-content' }}>
        {[...Array(2)].map((_, dup) => (
          <div key={dup} style={{ display: 'flex', gap: 48 }}>
            {['Python', 'FastAPI', 'PostgreSQL', 'React', 'TypeScript', 'Next.js', 'Docker', 'Redis', 'AWS', 'SQL', 'Celery', 'Tailwind'].map(t => (
              <span key={t + dup} className="mono" style={{ fontSize: 14, color: T.dim, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 500 }}>
                <span style={{ color: A.c, marginRight: 12 }}>◆</span>{t}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  </section>
);

