// About.jsx
// Component: <About/>. Yeinier Rivero - Developer portfolio

const About = ({ T, A, t }) => {
  const stats = [
    { number: 4, label: 'Años de Experiencia' },
    { number: 12, label: 'Clientes en USA' },
    { number: 15, label: 'Proyectos Completados' },
    { number: '100%', label: 'Automatización' },
  ];

  const skills = [
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
    { category: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'] },
    { category: 'AI & Automation', items: ['Machine Learning', 'Chatbots', 'APIs', 'Integraciones'] },
    { category: 'Infraestructura', items: ['Docker', 'AWS', 'Git', 'CI/CD'] },
  ];

  return (
    <section style={{ padding: '60px 0', borderTop: `1px solid ${T.line}`, background: T.bg2 }}>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 40, alignItems: 'start' }}>
          <div>
            <div className="mono" style={{ fontSize: 12, color: A.c, marginBottom: 12, letterSpacing: 1 }}>// ABOUT</div>
            <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 600, letterSpacing: -2.5, lineHeight: 1, margin: 0, marginBottom: 24 }}>
              Yeinier Rivero
            </h2>
            <p style={{ fontSize: 16, color: A.c, fontWeight: 500, marginBottom: 24 }}>
              Full Stack Developer | AI & Automation Specialist
            </p>
            <p style={{ fontSize: 15, color: T.dim, lineHeight: 1.8, marginBottom: 24, maxWidth: 600 }}>
              Con más de 4 años transformando ideas en soluciones de software personalizadas. Me especializo en crear sistemas eficientes y automatizados que optimizan el trabajo de mis clientes.
            </p>
            <p style={{ fontSize: 15, color: T.dim, lineHeight: 1.8, marginBottom: 32, maxWidth: 600 }}>
              Desde bases de datos a medida para agentes de seguros, hasta sistemas con IA y bots de automatización. Cada proyecto es diseñado pensando en maximizar la productividad y reducir costos operativos.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}>
              {stats.map((stat, i) => (
                <div key={i}>
                  <p style={{ fontSize: 32, fontWeight: 700, color: A.c, margin: 0 }}>{stat.number}</p>
                  <p style={{ fontSize: 12, color: T.dim, marginTop: 6 }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ background: T.bg, padding: 40, borderRadius: 16, border: `1px solid ${T.line}` }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 24 0', color: T.text }}>Stack Tecnológico</h3>
              {skills.map((skill, i) => (
                <div key={i} style={{ marginBottom: 24 }}>
                  <p className="mono" style={{ fontSize: 11, color: A.c, marginBottom: 8, letterSpacing: 1 }}>{skill.category}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {skill.items.map((item, j) => (
                      <span key={j} style={{
                        padding: '6px 12px', fontSize: 12, background: A.soft, color: A.c, borderRadius: 6, fontWeight: 500
                      }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
