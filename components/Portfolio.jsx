// Portfolio.jsx
// Component: <Portfolio/>. Casos de éxito y proyectos completados

const Portfolio = ({ T, A, t }) => {
  const projects = [
    {
      title: 'Sistema de Gestión para Agente de Seguros',
      description: 'Base de datos personalizada + dashboard con automatización de pólizas y clientes.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Automatización'],
      impact: '65% reducción en tareas manuales',
      icon: '📊',
    },
    {
      title: 'Bot de IA para Atención al Cliente',
      description: 'Chatbot inteligente que responde consultas automáticamente y escala tickets complejos.',
      tech: ['Python', 'Machine Learning', 'API REST', 'Integración'],
      impact: '80% menos consultas manuales',
      icon: '🤖',
    },
    {
      title: 'Plataforma Web para Clínica',
      description: 'Sistema completo de citas, historiales médicos y gestión de pacientes.',
      tech: ['React', 'Node.js', 'MongoDB', 'Seguridad HIPAA'],
      impact: '90% automatización de procesos',
      icon: '🏥',
    },
    {
      title: 'Portal Web para Agentes Aseguradores #1',
      description: 'Dashboard con seguimiento de clientes, cotizaciones y comisiones en tiempo real.',
      tech: ['Next.js', 'PostgreSQL', 'Dashboard Interactivo'],
      impact: 'Control total de negocio',
      icon: '📱',
    },
    {
      title: 'Portal Web para Agentes Aseguradores #2',
      description: 'Plataforma de ventas con herramientas de prospección y análisis de datos.',
      tech: ['React', 'TypeScript', 'Analytics', 'Reportes'],
      impact: '40% aumento en conversiones',
      icon: '📈',
    },
    {
      title: 'Software de Conciliación Bancaria Automatizado',
      description: 'Sistema inteligente que concilia transacciones bancarias automáticamente con registros contables.',
      tech: ['Python', 'Machine Learning', 'APIs Bancarias', 'Reporting'],
      impact: '95% automatización, 0 errores manuales',
      icon: '🏦',
    },
    {
      title: 'CRM Personalizado',
      description: 'Sistema de gestión de relaciones con clientes adaptado a las necesidades específicas del negocio.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'API REST'],
      impact: 'Gestión integral de clientes',
      icon: '👥',
    },
  ];

  return (
    <section style={{ padding: '120px 0', borderTop: `1px solid ${T.line}` }}>
      <Container>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <div className="mono" style={{ fontSize: 12, color: A.c, marginBottom: 12, letterSpacing: 1 }}>// PORTFOLIO</div>
          <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 600, letterSpacing: -2.5, lineHeight: 1, margin: 0 }}>
            Casos de Éxito
          </h2>
          <p style={{ fontSize: 16, color: T.dim, marginTop: 20, maxWidth: 600, margin: '20px auto 0' }}>
            Proyectos completados que han transformado negocios y automatizado procesos críticos.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 24 }}>
          {projects.map((proj, i) => (
            <div key={i} style={{
              padding: 32, border: `1px solid ${T.line}`, borderRadius: 12, background: T.bg,
              transition: 'all 0.3s', cursor: 'pointer',
              ':hover': { borderColor: A.c, boxShadow: `0 0 20px ${A.c}40` }
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = A.c;
              e.currentTarget.style.boxShadow = `0 0 20px ${A.c}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = T.line;
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{proj.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 12 0', color: T.text }}>
                {proj.title}
              </h3>
              <p style={{ fontSize: 14, color: T.dim, lineHeight: 1.6, margin: '12px 0' }}>
                {proj.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '16px 0' }}>
                {proj.tech.map((t, j) => (
                  <span key={j} className="mono" style={{
                    fontSize: 10, padding: '4px 8px', background: A.soft, color: A.c, borderRadius: 4
                  }}>
                    {t}
                  </span>
                ))}
              </div>
              <p style={{ fontSize: 13, color: A.c, fontWeight: 600, margin: '16px 0 0 0' }}>
                ✓ {proj.impact}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
