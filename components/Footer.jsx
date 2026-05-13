// Footer.jsx
// Component: <Footer/>. Receives T (theme), A (accent), t (translations) as props where used.

const Footer = ({ T, A, t }) => (
  <footer style={{ borderTop: `1px solid ${T.line}`, padding: '48px 0 24px' }}>
    <Container>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr repeat(3, 1fr)', gap: 32, paddingBottom: 32, borderBottom: `1px solid ${T.line}` }}>
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
            <img src="logo.png" alt="YR System" style={{ height: 60, objectFit: 'contain', borderRadius: 6 }} />
          </div>
          <p style={{ fontSize: 13, color: T.dim, lineHeight: 1.55, margin: 0, maxWidth: 320 }}>
            {t.ft_tagline}
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 16, padding: '6px 12px', border: `1px solid ${T.line}`, borderRadius: 999 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: A.c, animation: 'pulse 2s infinite' }} />
            <span className="mono" style={{ fontSize: 11, color: T.text }}>{t.ft_status}</span>
          </div>
        </div>
        {[
          [t.ft_g_services, t.ft_l_services],
          [t.ft_g_company, t.ft_l_company],
          [t.ft_g_connect, t.ft_l_connect],
        ].map(([title, links]) => (
          <div key={title} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className="mono" style={{ fontSize: 11, color: A.c, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 }}>{title}</div>
            {links.map(l => <a key={l} href="#" style={{ fontSize: 14, color: T.dim }}>{l}</a>)}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 24, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.dim }}>
        <span>{t.ft_copyright}</span>
        <span>{t.ft_built}</span>
      </div>
    </Container>
  </footer>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
