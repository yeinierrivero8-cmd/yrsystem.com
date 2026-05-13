// Contact.jsx
// Component: <Contact/>. Receives T (theme), A (accent), t (translations) as props where used.

const { useState, useRef, useEffect } = React;

const EMAILJS_SERVICE_ID  = 'service_pv902gp';
const EMAILJS_TEMPLATE_ID = 'hci52rm';
const EMAILJS_PUBLIC_KEY  = '6qQjv7wHUpTuW46G5';

const Contact = ({ T, A, t }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', project: '', budget: '', phone: '' });
  const [errors, setErrors] = useState({});
  const successRef = useRef(null);
  const errorRef = useRef(null);
  const formRef = useRef(null);

  const validateField = (name, value) => {
    if (name === 'name') return value.length >= 3 ? '' : 'Mínimo 3 caracteres';
    if (name === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Email inválido';
    if (name === 'project') return value.length >= 10 ? '' : 'Mínimo 10 caracteres';
    if (name === 'phone') return value.replace(/\D/g, '').length >= 10 ? '' : 'Teléfono inválido';
    return '';
  };

  const handleFieldChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const newErrors = {};
    ['name', 'email', 'project'].forEach(field => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const message = `*Nueva Consulta de YR System*%0A%0A*Nombre:* ${encodeURIComponent(formData.name)}%0A*Email:* ${encodeURIComponent(formData.email)}%0A*Empresa:* ${encodeURIComponent(formData.company || 'N/A')}%0A*Tipo de Proyecto:* ${encodeURIComponent(formData.project)}%0A*Presupuesto:* ${encodeURIComponent(formData.budget || 'No especificado')}%0A*Teléfono:* ${encodeURIComponent(formData.phone || 'N/A')}`;
      window.open(`https://wa.me/17866020720?text=${message}`, '_blank');

      setSubmitted(true);
      setFormData({ name: '', email: '', company: '', project: '', budget: '', phone: '' });
      if (successRef.current) {
        gsap.from(successRef.current, {
          opacity: 0,
          scale: 0.9,
          y: 20,
          duration: 0.6,
          ease: 'back.out',
        });
      }
    } catch (err) {
      setError(t.ct_error);
      if (errorRef.current) {
        gsap.from(errorRef.current, {
          opacity: 0,
          scale: 0.9,
          y: 20,
          duration: 0.6,
          ease: 'back.out',
        });
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (formRef.current) {
      const inputs = formRef.current.querySelectorAll('input[type="text"], input[type="email"], textarea');
      inputs.forEach(input => {
        GsapUtils.inputGlow(input, A.c);
      });
    }
  }, [A.c]);

  return (
    <section id="contact" style={{ padding: '120px 0', borderTop: `1px solid ${T.line}` }}>
      <Container>
        <div style={{
          padding: 48, borderRadius: 16, border: `1px solid ${T.line2}`,
          background: T.bg2, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -200, right: -200, width: 600, height: 600,
            borderRadius: '50%', background: `radial-gradient(circle, ${A.soft}, transparent 60%)`,
            filter: 'blur(60px)', pointerEvents: 'none',
          }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, position: 'relative' }}>
            <div>
              <div className="mono" style={{ fontSize: 12, color: A.c, marginBottom: 12, letterSpacing: 1 }}>// SECTION 08</div>
              <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 600, letterSpacing: -2.5, lineHeight: 0.95, margin: 0 }}>
                {t.ct_title_a}<br />{t.ct_title_b}
              </h2>
              <p style={{ fontSize: 17, color: T.dim, marginTop: 24, lineHeight: 1.55, maxWidth: 480 }}>
                {t.ct_intro}
              </p>

              <div style={{ marginTop: 40, paddingTop: 32, borderTop: `1px solid ${T.line}`, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="mono" style={{ fontSize: 11, color: T.dim, letterSpacing: 1 }}>{t.ct_direct}</div>
                <a href="mailto:yeinierrivero8@gmail.com" style={{
                  display: 'flex', alignItems: 'center', gap: 12, fontSize: 18, color: T.text, fontWeight: 500,
                }}>
                  <span style={{ color: A.c }}>→</span> yeinierrivero8@gmail.com
                </a>
                <a href="tel:+17866020720" style={{
                  display: 'flex', alignItems: 'center', gap: 12, fontSize: 18, color: T.text, fontWeight: 500,
                }}>
                  <span style={{ color: A.c }}>→</span> +1 (786) 602-0720
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: T.dim }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: A.c, animation: 'pulse 2s infinite' }} />
                  {t.ct_location}
                </div>
              </div>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }} aria-label="Contact form">
              {error && (
                <div ref={errorRef} style={{
                  padding: 32, border: `1px solid #ef4444`, borderRadius: 8, background: 'rgba(239, 68, 68, 0.1)',
                  display: 'flex', flexDirection: 'column', gap: 12,
                }} role="alert" aria-live="polite">
                  <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: -0.5, color: '#dc2626' }}>
                    Error al enviar
                  </div>
                  <p style={{ fontSize: 14, color: T.dim, margin: 0, lineHeight: 1.5 }}>
                    {error}
                  </p>
                </div>
              )}
              {submitted ? (
                <div ref={successRef} style={{
                  padding: 32, border: `1px solid ${A.c}`, borderRadius: 8, background: A.soft,
                  display: 'flex', flexDirection: 'column', gap: 12,
                }} role="alert" aria-live="polite">
                  <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: -0.5 }}>
                    {t.ct_sent}
                  </div>
                  <p style={{ fontSize: 14, color: T.dim, margin: 0, lineHeight: 1.5 }}>
                    {t.ct_sent_sub}
                  </p>
                </div>
              ) : (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <Field T={T} label={t.ct_name} placeholder={t.ct_name_ph} name="name" value={formData.name} onChange={(e) => handleFieldChange('name', e.target.value)} error={errors.name} required aria-required="true" />
                    <Field T={T} label={t.ct_email} type="email" placeholder={t.ct_email_ph} name="email" value={formData.email} onChange={(e) => handleFieldChange('email', e.target.value)} error={errors.email} required aria-required="true" />
                  </div>
                  <Field T={T} label={t.ct_company} placeholder={t.ct_company_ph} name="company" value={formData.company} onChange={(e) => handleFieldChange('company', e.target.value)} />
                  <Field T={T} label={t.ct_project} placeholder={t.ct_project_ph} name="project" value={formData.project} onChange={(e) => handleFieldChange('project', e.target.value)} error={errors.project} textarea rows={4} required aria-required="true" />
                  <div>
                    <div className="mono" style={{ fontSize: 11, color: T.dim, letterSpacing: 1, marginBottom: 8 }} id="budget-legend">{t.ct_budget}</div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }} role="radiogroup" aria-labelledby="budget-legend">
                      {['$500-$5k', '$5k-$15k', '$15k-$50k', '$50k+'].map(b => (
                        <label key={b} style={{
                          padding: '8px 14px', border: `1px solid ${formData.budget === b ? A.c : T.line2}`, borderRadius: 6,
                          fontSize: 13, color: T.text, cursor: 'pointer',
                          fontFamily: "'JetBrains Mono', monospace",
                          background: formData.budget === b ? A.soft : 'transparent',
                        }}>
                          <input type="radio" name="budget" value={b} onChange={(e) => handleFieldChange('budget', e.target.value)} style={{ display: 'none' }} aria-label={`Budget: ${b}`} />
                          {b}
                        </label>
                      ))}
                    </div>
                  </div>
                  <button type="submit" disabled={loading} style={{
                    padding: '14px 24px', background: loading ? T.dim : A.c, color: A.ink,
                    border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 600,
                    cursor: loading ? 'not-allowed' : 'pointer', marginTop: 8, display: 'inline-flex',
                    alignItems: 'center', justifyContent: 'center', gap: 8, opacity: loading ? 0.6 : 1,
                  }} aria-label={loading ? t.ct_sending : t.ct_send}>
                    {loading ? t.ct_sending : t.ct_send} <span aria-hidden="true">→</span>
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};

