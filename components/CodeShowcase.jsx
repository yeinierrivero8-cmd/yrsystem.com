// CodeShowcase.jsx
// Component: <CodeShowcase/>. Receives T (theme), A (accent), t (translations) as props where used.

const CodeShowcase = ({ T, A, t }) => {
  const [tab, setTab] = useState(0);
  const tabs = [
    {
      name: 'main.py',
      lang: 'python',
      code: `from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .db import get_db
from .schemas import ProjectCreate, Project

app = FastAPI(title="YR System API")

@app.post("/projects", response_model=Project)
async def create_project(
    payload: ProjectCreate,
    db: Session = Depends(get_db),
):
    project = await Project.create(db, **payload.dict())
    await notify_slack(f"New project: {project.name}")
    return project`,
    },
    {
      name: 'schema.sql',
      lang: 'sql',
      code: `CREATE TABLE projects (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id   UUID NOT NULL REFERENCES clients(id),
  name        TEXT NOT NULL,
  status      project_status NOT NULL DEFAULT 'pending',
  budget      NUMERIC(10, 2),
  started_at  TIMESTAMPTZ DEFAULT NOW(),
  metadata    JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_projects_client ON projects(client_id);
CREATE INDEX idx_projects_status ON projects(status)
  WHERE status IN ('active', 'pending');`,
    },
    {
      name: 'client.tsx',
      lang: 'typescript',
      code: `import { useQuery } from '@tanstack/react-query';
import type { Project } from './types';

export function useProjects(clientId: string) {
  return useQuery<Project[]>({
    queryKey: ['projects', clientId],
    queryFn: async () => {
      const res = await fetch(\`/api/projects?client=\${clientId}\`);
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
    staleTime: 30_000,
  });
}`,
    },
  ];

  const highlight = (code, lang) => {
    const rules = {
      python: [
        [/(#[^\n]*)/g, T.dim],
        [/\b(from|import|async|await|def|return|class|if|else|raise)\b/g, A.c],
        [/\b(FastAPI|Depends|HTTPException|Session|ProjectCreate|Project)\b/g, '#7dd3fc'],
        [/("[^"]*"|'[^']*')/g, '#fda4af'],
        [/(@\w+)/g, '#fcd34d'],
      ],
      sql: [
        [/(--[^\n]*)/g, T.dim],
        [/\b(CREATE|TABLE|PRIMARY|KEY|DEFAULT|NOT|NULL|REFERENCES|INDEX|ON|WHERE|IN)\b/gi, A.c],
        [/\b(UUID|TEXT|NUMERIC|TIMESTAMPTZ|JSONB)\b/g, '#7dd3fc'],
        [/('[^']*')/g, '#fda4af'],
        [/(\w+\(\))/g, '#fcd34d'],
      ],
      typescript: [
        [/(\/\/[^\n]*)/g, T.dim],
        [/\b(import|from|export|function|return|async|await|throw|new|const|let|if)\b/g, A.c],
        [/\b(useQuery|fetch|Error|Project|Promise)\b/g, '#7dd3fc'],
        [/(`[^`]*`|"[^"]*"|'[^']*')/g, '#fda4af'],
      ],
    };
    // Tokenize first (avoid re-matching inside marker payloads), then escape, then wrap.
    const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const tokens = [];
    let src = code;
    for (const [re, color] of (rules[lang] || [])) {
      src = src.replace(re, (m) => {
        const idx = tokens.length;
        tokens.push({ text: m, color });
        return `\u0000T${idx}\u0000`;
      });
    }
    let out = escapeHtml(src);
    out = out.replace(/\u0000T(\d+)\u0000/g, (_, i) => {
      const tk = tokens[+i];
      return `<span style="color:${tk.color}">${escapeHtml(tk.text)}</span>`;
    });
    return out;
  };

  return (
    <section id="code" style={{ padding: '120px 0', borderTop: `1px solid ${T.line}` }}>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div className="mono" style={{ fontSize: 12, color: A.c, marginBottom: 12, letterSpacing: 1 }}>// SECTION 02</div>
            <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 600, letterSpacing: -2, lineHeight: 1, margin: 0 }}>
              {t.cs_title_a}<br />{t.cs_title_b}
            </h2>
            <p style={{ fontSize: 17, color: T.dim, lineHeight: 1.6, marginTop: 24 }}>
              {t.cs_intro}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '32px 0 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[t.cs_b1, t.cs_b2, t.cs_b3, t.cs_b4].map(item => (
                <li key={item} style={{ display: 'flex', gap: 12, fontSize: 15, color: T.text }}>
                  <span style={{ color: A.c, marginTop: 4 }}>→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{
            border: `1px solid ${T.line2}`, borderRadius: 12, overflow: 'hidden',
            background: T.bg2, boxShadow: `0 30px 60px -20px rgba(0,0,0,0.4)`,
          }}>
            <div style={{ display: 'flex', borderBottom: `1px solid ${T.line}`, background: T.bg3 }}>
              {tabs.map((tb, i) => (
                <button key={tb.name} onClick={() => setTab(i)} className="mono" style={{
                  background: tab === i ? T.bg2 : 'transparent',
                  border: 'none', padding: '12px 18px', fontSize: 12,
                  color: tab === i ? T.text : T.dim, cursor: 'pointer',
                  borderRight: `1px solid ${T.line}`,
                  borderBottom: tab === i ? `2px solid ${A.c}` : '2px solid transparent',
                  fontWeight: tab === i ? 600 : 400,
                  fontFamily: "'JetBrains Mono', monospace",
                }}>{tb.name}</button>
              ))}
              <div style={{ marginLeft: 'auto', padding: '12px 18px', display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: A.c }} />
                <span className="mono" style={{ fontSize: 11, color: T.dim }}>passing</span>
              </div>
            </div>
            <pre className="mono" style={{
              margin: 0, padding: '24px 28px', fontSize: 13, lineHeight: 1.65,
              color: T.text, overflowX: 'auto',
            }}>
              <code dangerouslySetInnerHTML={{ __html: highlight(tabs[tab].code, tabs[tab].lang) }} />
            </pre>
          </div>
        </div>
      </Container>
    </section>
  );
};

