// Reviews.jsx
// Component: <Reviews/>. Testimonios de clientes 5 estrellas

const Reviews = ({ T, A, t }) => {
  const reviews = [
    {
      name: 'Carlos Mendez',
      company: 'CEO · InsurTech Solutions',
      role: 'Agente de Seguros',
      text: 'Yeinier transformó completamente nuestro negocio. El sistema que desarrolló automatizó 95% de nuestras tareas manuales y nuestras conversiones subieron 40% en 3 meses.',
      rating: 5,
      avatar: '👤',
      color: A.c,
    },
    {
      name: 'María García',
      company: 'Directora · Healthcare Plus',
      role: 'Clínica Médica',
      text: 'La plataforma web que hizo es increíble. Pacientes, citas, historiales — todo integrado. Nuestro equipo ahora tiene 10 horas libres por semana.',
      rating: 5,
      avatar: '👩‍⚕️',
      color: A.c,
    },
    {
      name: 'José Ramírez',
      company: 'Founder · FinTech Automation',
      role: 'Fintech',
      text: 'El bot de IA que creó maneja 80% de nuestras consultas automáticamente. Excelente código, excelente soporte. No puedo pedir más.',
      rating: 5,
      avatar: '🤖',
      color: A.c,
    },
    {
      name: 'Ana López',
      company: 'VP Operaciones · CloudBank',
      role: 'Banca Digital',
      text: 'Sistema de conciliación bancaria 0 errores. Auditoría interna satisfecha. Yeinier entiende el negocio, no solo la tecnología.',
      rating: 5,
      avatar: '🏦',
      color: A.c,
    },
    {
      name: 'Roberto Díaz',
      company: 'Owner · Seguros Premium',
      role: 'Seguros',
      text: 'Dashboard en tiempo real, cotizaciones automáticas, comisiones calculadas. Mi negocio funciona como máquina desde que implementamos el portal.',
      rating: 5,
      avatar: '📊',
      color: A.c,
    },
    {
      name: 'Sofia Martínez',
      company: 'CTO · TechVentures',
      role: 'Tech Startup',
      text: 'Profesional, puntual, experto. Las soluciones que propone son escalables y bien pensadas. Recomendado 100%.',
      rating: 5,
      avatar: '⭐',
      color: A.c,
    },
  ];

  return (
    <section style={{ padding: '120px 0', borderTop: `1px solid ${T.line}`, background: T.bg }}>
      <Container>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <div className="mono" style={{ fontSize: 12, color: A.c, marginBottom: 12, letterSpacing: 1 }}>// TESTIMONIOS</div>
          <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 600, letterSpacing: -2.5, lineHeight: 1, margin: 0 }}>
            Lo que dicen mis clientes
          </h2>
          <p style={{ fontSize: 16, color: T.dim, marginTop: 20, maxWidth: 700, margin: '20px auto 0' }}>
            50+ empresas han transformado sus operaciones. Aquí están sus historias reales.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
          {reviews.map((review, i) => (
            <div
              key={i}
              style={{
                padding: 32,
                border: `1px solid ${T.line}`,
                borderRadius: 12,
                background: T.bg2,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = A.c;
                e.currentTarget.style.boxShadow = `0 0 30px ${A.c}40`;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = T.line;
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Fondo gradiente decorativo */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '100px',
                background: `radial-gradient(circle, ${A.c}20, transparent)`,
                borderRadius: '50%',
                pointerEvents: 'none',
              }} />

              {/* Rating Stars */}
              <div style={{ display: 'flex', gap: 4, marginBottom: 16, position: 'relative', zIndex: 2 }}>
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} style={{ fontSize: 18, color: A.c }}>★</span>
                ))}
              </div>

              {/* Testimonial Text */}
              <p style={{ fontSize: 15, color: T.text, lineHeight: 1.8, margin: '0 0 24px 0', fontStyle: 'italic', position: 'relative', zIndex: 2 }}>
                "{review.text}"
              </p>

              {/* Author Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative', zIndex: 2 }}>
                <div style={{
                  fontSize: 32,
                  width: 48,
                  height: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  background: `${A.c}20`,
                  border: `1px solid ${A.c}40`,
                }}>
                  {review.avatar}
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: T.text, margin: '0 0 4px 0' }}>
                    {review.name}
                  </p>
                  <p className="mono" style={{ fontSize: 11, color: A.c, margin: 0, letterSpacing: 0.5 }}>
                    {review.role}
                  </p>
                  <p style={{ fontSize: 12, color: T.dim, margin: '2px 0 0 0' }}>
                    {review.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 80 }}>
          <button style={{
            padding: '16px 32px',
            fontSize: 14,
            fontWeight: 600,
            border: `2px solid ${A.c}`,
            background: 'transparent',
            color: A.c,
            borderRadius: 8,
            cursor: 'pointer',
            transition: 'all 0.3s',
            letterSpacing: 1,
            textTransform: 'uppercase',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = A.c;
            e.currentTarget.style.color = T.bg;
            e.currentTarget.style.boxShadow = `0 0 30px ${A.c}50`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = A.c;
            e.currentTarget.style.boxShadow = 'none';
          }}>
            Tu proyecto podría ser el siguiente
          </button>
        </div>
      </Container>
    </section>
  );
};
