// Pricing.jsx
// Component: <Pricing/>. Receives T (theme), A (accent), t (translations) as props where used.

const Pricing = ({ T, A, t }) => {
  const plans = [
    {
      n: 'Starter',
      p: '$450',
      sub: t.pc_per_project,
      desc: t.pc_starter_desc,
      f: t.pc_starter_f,
    },
    {
      n: 'Pro',
      p: '$1,200',
      sub: t.pc_per_project,
      desc: t.pc_pro_desc,
      featured: true,
      f: t.pc_pro_f,
    },
    {
      n: 'Enterprise',
      p: '$3,500+',
      sub: t.pc_per_project,
      desc: t.pc_ent_desc,
      f: t.pc_ent_f,
    },
  ];

  return (
    <section id="pricing" style={{ padding: '120px 0', borderTop: `1px solid ${T.line}` }}>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 48, marginBottom: 64, alignItems: 'flex-end' }}>
          <div>
            <div className="mono" style={{ fontSize: 12, color: A.c, marginBottom: 12, letterSpacing: 1 }}>// SECTION 06</div>
            <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 600, letterSpacing: -2, lineHeight: 1, margin: 0 }}>
              {t.pc_title}
            </h2>
          </div>
          <p style={{ fontSize: 17, color: T.dim, lineHeight: 1.55, margin: 0, maxWidth: 540, justifySelf: 'flex-end' }}>
            {t.pc_intro}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {plans.map(plan => (
            <div key={plan.n} style={{
              padding: 32, borderRadius: 12, position: 'relative',
              background: plan.featured ? T.bg2 : T.bg,
              border: `1px solid ${plan.featured ? A.c : T.line}`,
              display: 'flex', flexDirection: 'column', gap: 16,
              boxShadow: plan.featured ? `0 0 0 4px ${A.soft}` : 'none',
            }}>
              {plan.featured && (
                <div style={{
                  position: 'absolute', top: -10, left: 24,
                  padding: '4px 10px', background: A.c, color: A.ink,
                  borderRadius: 4, fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
                  fontFamily: "'JetBrains Mono', monospace",
                }}>{t.pc_recommended}</div>
              )}
              <div className="mono" style={{ fontSize: 12, color: A.c, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 600 }}>{plan.n}</div>
              <div style={{ fontSize: 14, color: T.dim }}>{plan.desc}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 8 }}>
                <span style={{ fontSize: 48, fontWeight: 600, letterSpacing: -2, color: T.text }}>{plan.p}</span>
                <span className="mono" style={{ fontSize: 13, color: T.dim }}>{plan.sub}</span>
              </div>
              <div style={{ height: 1, background: T.line, margin: '8px 0' }} />
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                {plan.f.map(f => (
                  <li key={f} style={{ display: 'flex', gap: 10, fontSize: 14, color: T.text, lineHeight: 1.45 }}>
                    <span style={{ color: A.c }}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" style={{
                marginTop: 16, padding: '12px 18px', borderRadius: 8, textAlign: 'center',
                background: plan.featured ? A.c : 'transparent',
                color: plan.featured ? A.ink : T.text,
                border: `1px solid ${plan.featured ? A.c : T.line2}`,
                fontSize: 14, fontWeight: 600,
              }}>
                {plan.p === '$3,500+' ? `${t.pc_btn_talk} →` : `${t.pc_btn_start} →`}
              </a>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

