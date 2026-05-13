// Stack.jsx
// Component: <Stack/>. Receives T (theme), A (accent), t (translations) as props where used.

const Stack = ({ T, A, t }) => {
  const groups = [
    {
      title: t.st_g_backend,
      items: [
        { name: 'Python', desc: t.st_d_main_lang },
        { name: 'FastAPI', desc: t.st_d_async_web },
        { name: 'SQLAlchemy', desc: t.st_d_orm },
        { name: 'Pydantic', desc: t.st_d_validation },
        { name: 'Celery', desc: t.st_d_bg_tasks },
      ],
    },
    {
      title: t.st_g_data,
      items: [
        { name: 'PostgreSQL', desc: t.st_d_main_db },
        { name: 'SQL', desc: t.st_d_queries },
        { name: 'Redis', desc: t.st_d_cache },
        { name: 'TimescaleDB', desc: t.st_d_timeseries },
        { name: 'Alembic', desc: t.st_d_migrations },
      ],
    },
    {
      title: t.st_g_frontend,
      items: [
        { name: 'React', desc: t.st_d_ui },
        { name: 'Next.js', desc: t.st_d_fullstack },
        { name: 'TypeScript', desc: t.st_d_strict_types },
        { name: 'Tailwind', desc: t.st_d_utility_css },
        { name: 'TanStack Query', desc: t.st_d_server_state },
      ],
    },
    {
      title: t.st_g_infra,
      items: [
        { name: 'Docker', desc: t.st_d_containers },
        { name: 'AWS', desc: t.st_d_cloud },
        { name: 'Vercel', desc: t.st_d_deploy_fe },
        { name: 'GitHub Actions', desc: t.st_d_cicd },
        { name: 'Sentry', desc: t.st_d_monitoring },
      ],
    },
  ];

  return (
    <section id="stack" style={{ padding: '120px 0', borderTop: `1px solid ${T.line}` }}>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 48, marginBottom: 64, alignItems: 'flex-end' }}>
          <div>
            <div className="mono" style={{ fontSize: 12, color: A.c, marginBottom: 12, letterSpacing: 1 }}>// SECTION 03</div>
            <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 600, letterSpacing: -2, lineHeight: 1, margin: 0 }}>
              {t.st_title}
            </h2>
          </div>
          <p style={{ fontSize: 17, color: T.dim, lineHeight: 1.55, margin: 0, maxWidth: 540, justifySelf: 'flex-end' }}>
            {t.st_intro}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: T.line, border: `1px solid ${T.line}`, borderRadius: 12, overflow: 'hidden' }}>
          {groups.map(g => (
            <div key={g.title} style={{ background: T.bg, padding: 24 }}>
              <div className="mono" style={{
                fontSize: 11, color: A.c, letterSpacing: 1.5,
                paddingBottom: 16, marginBottom: 16, borderBottom: `1px solid ${T.line}`,
                textTransform: 'uppercase', fontWeight: 600,
              }}>
                {g.title}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {g.items.map(it => (
                  <li key={it.name} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: T.text }}>{it.name}</span>
                    <span className="mono" style={{ fontSize: 11, color: T.dim }}>{it.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

