// Services.jsx
// Component: <Services/>. Receives T (theme), A (accent), t (translations) as props where used.

const { useState, useRef, useEffect } = React;

const Services = ({ T, A, t }) => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (containerRef.current) {
      GsapUtils.staggerCards(containerRef.current, 'article');
      cardsRef.current.forEach(card => {
        if (card) GsapUtils.cardHover3D(card);
      });
    }
  }, []);

  const services = [
    { id: 'POST', name: t.sv_1_name, desc: t.sv_1_desc, tags: ['React', 'FastAPI', 'Postgres'] },
    { id: 'GET', name: t.sv_2_name, desc: t.sv_2_desc, tags: ['FastAPI', 'OpenAPI', 'JWT'] },
    { id: 'PUT', name: t.sv_3_name, desc: t.sv_3_desc, tags: ['SQL', 'Postgres', 'Redis'] },
    { id: 'PATCH', name: t.sv_4_name, desc: t.sv_4_desc, tags: ['Python', 'Celery', 'Docker'] },
    { id: 'POST', name: t.sv_5_name, desc: t.sv_5_desc, tags: ['Next.js', 'Stripe', 'Postgres'] },
    { id: 'GET', name: t.sv_6_name, desc: t.sv_6_desc, tags: ['Architecture', 'Audit', 'Review'] },
  ];

  return (
    <section id="servicios" style={{ padding: '120px 0', borderTop: `1px solid ${T.line}` }}>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 48, marginBottom: 64, alignItems: 'flex-end' }}>
          <div>
            <div className="mono" style={{ fontSize: 12, color: A.c, marginBottom: 12, letterSpacing: 1 }}>// SECTION 01</div>
            <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 600, letterSpacing: -2, lineHeight: 1, margin: 0 }}>
              {t.sv_title}
            </h2>
          </div>
          <p style={{ fontSize: 17, color: T.dim, lineHeight: 1.55, margin: 0, maxWidth: 540, justifySelf: 'flex-end' }}>
            {t.sv_intro}
          </p>
        </div>

        <div ref={containerRef} style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0,
          border: `1px solid ${T.line}`, borderRadius: 12, overflow: 'hidden',
        }}>
          {services.map((s, i) => (
            <article
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="hover-lift"
              style={{
              padding: 28, background: T.bg,
              borderRight: (i % 3 !== 2) ? `1px solid ${T.line}` : 'none',
              borderBottom: (i < 3) ? `1px solid ${T.line}` : 'none',
              display: 'flex', flexDirection: 'column', gap: 14, minHeight: 220,
              border: `1px solid transparent`,
              cursor: 'pointer',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="mono" style={{
                  fontSize: 10, padding: '3px 8px', background: A.soft, color: A.c,
                  borderRadius: 4, fontWeight: 600, letterSpacing: 0.5,
                }}>{s.id}</span>
                <span className="arrow-link" style={{ color: T.dim, fontSize: 16 }}>↗</span>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 600, letterSpacing: -0.5, margin: 0, marginTop: 12 }}>
                {s.name}
              </h3>
              <p style={{ fontSize: 14, color: T.dim, lineHeight: 1.55, margin: 0, flex: 1 }}>
                {s.desc}
              </p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
                {s.tags.map(t => (
                  <span key={t} className="mono" style={{
                    fontSize: 11, padding: '3px 8px', borderRadius: 4,
                    background: T.bg2, color: T.dim, border: `1px solid ${T.line}`,
                  }}>{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};

