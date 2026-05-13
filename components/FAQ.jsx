// FAQ.jsx
// Component: <FAQ/>. Receives T (theme), A (accent), t (translations) as props where used.

const { useState, useRef, useEffect } = React;

const FAQ = ({ T, A, t }) => {
  const [expanded, setExpanded] = useState(null);
  const contentRefs = useRef([]);

  const items = [
    [t.faq_q1, t.faq_a1],
    [t.faq_q2, t.faq_a2],
    [t.faq_q3, t.faq_a3],
    [t.faq_q4, t.faq_a4],
    [t.faq_q5, t.faq_a5],
    [t.faq_q6, t.faq_a6],
  ];

  const toggleItem = (i) => {
    const contentEl = contentRefs.current[i];
    if (!contentEl) return;

    if (expanded === i) {
      gsap.to(contentEl, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      });
      setExpanded(null);
    } else {
      if (expanded !== null && contentRefs.current[expanded]) {
        gsap.to(contentRefs.current[expanded], {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.inOut',
        });
      }
      gsap.fromTo(contentEl, { height: 0, opacity: 0 }, {
        height: 'auto',
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
      setExpanded(i);
    }
  };

  return (
    <section style={{ padding: '120px 0', borderTop: `1px solid ${T.line}` }}>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 64 }}>
          <div>
            <div className="mono" style={{ fontSize: 12, color: A.c, marginBottom: 12, letterSpacing: 1 }}>// SECTION 07</div>
            <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 600, letterSpacing: -2, lineHeight: 1, margin: 0 }}>
              {t.faq_title_a}<br />{t.faq_title_b}
            </h2>
            <p style={{ fontSize: 15, color: T.dim, marginTop: 24, lineHeight: 1.55 }}>
              {t.faq_more} <a href="#contact" style={{ color: A.c, fontWeight: 600 }}>{t.faq_write} →</a>
            </p>
          </div>
          <div style={{ borderTop: `1px solid ${T.line}` }}>
            {items.map(([q, a], i) => (
              <div key={i} style={{ borderBottom: `1px solid ${T.line}` }}>
                <button
                  onClick={() => toggleItem(i)}
                  aria-expanded={expanded === i}
                  aria-controls={`faq-content-${i}`}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '24px 0',
                    cursor: 'pointer',
                    fontSize: 17,
                    fontWeight: 600,
                    border: 'none',
                    background: 'transparent',
                    color: 'inherit',
                  }}
                >
                  <span style={{ display: 'flex', gap: 16, alignItems: 'baseline', textAlign: 'left' }}>
                    <span className="mono" style={{ fontSize: 11, color: A.c }}>0{i+1}</span>
                    <span>{q}</span>
                  </span>
                  <span style={{ fontSize: 20, color: A.c, fontWeight: 300, transform: expanded === i ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} aria-hidden="true">+</span>
                </button>
                <div
                  id={`faq-content-${i}`}
                  ref={el => contentRefs.current[i] = el}
                  style={{ height: 0, opacity: 0, overflow: 'hidden' }}
                  role="region"
                >
                  <p style={{ padding: '0 0 24px 44px', fontSize: 15, color: T.dim, lineHeight: 1.6, margin: 0, maxWidth: 640 }}>
                    {a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

