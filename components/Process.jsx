// Process.jsx
// Component: <Process/>. Receives T (theme), A (accent), t (translations) as props where used.

const Process = ({ T, A, t }) => {
  const steps = [
    ['01', t.pr_1_name, t.pr_1_dur, t.pr_1_desc],
    ['02', t.pr_2_name, t.pr_2_dur, t.pr_2_desc],
    ['03', t.pr_3_name, t.pr_3_dur, t.pr_3_desc],
    ['04', t.pr_4_name, t.pr_4_dur, t.pr_4_desc],
  ];

  return (
    <section id="proceso" style={{ padding: '120px 0', borderTop: `1px solid ${T.line}` }}>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 48, marginBottom: 64, alignItems: 'flex-end' }}>
          <div>
            <div className="mono" style={{ fontSize: 12, color: A.c, marginBottom: 12, letterSpacing: 1 }}>// SECTION 04</div>
            <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 600, letterSpacing: -2, lineHeight: 1, margin: 0 }}>
              {t.pr_title}
            </h2>
          </div>
          <p style={{ fontSize: 17, color: T.dim, lineHeight: 1.55, margin: 0, maxWidth: 540, justifySelf: 'flex-end' }}>
            {t.pr_intro}
          </p>
        </div>

        <div style={{ borderTop: `1px solid ${T.line2}` }}>
          {steps.map(([n, name, dur, desc], i) => (
            <div key={n} style={{
              display: 'grid', gridTemplateColumns: '80px 280px 100px 1fr 40px',
              gap: 32, padding: '28px 0', alignItems: 'center',
              borderBottom: `1px solid ${T.line}`,
              transition: 'padding .25s, background .25s',
            }}>
              <span className="mono" style={{ fontSize: 13, color: A.c, fontWeight: 600 }}>{n}</span>
              <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: -0.5 }}>{name}</span>
              <span className="mono" style={{
                fontSize: 11, color: T.dim, padding: '4px 10px',
                border: `1px solid ${T.line}`, borderRadius: 4, justifySelf: 'flex-start',
              }}>{dur}</span>
              <span style={{ fontSize: 15, color: T.dim, lineHeight: 1.5 }}>{desc}</span>
              <span style={{ color: T.dim, fontSize: 18, textAlign: 'right' }}>↗</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

