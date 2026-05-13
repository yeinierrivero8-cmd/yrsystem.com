// Field.jsx
// Component: <Field/>. Receives T (theme), A (accent), t (translations) as props where used.

const Field = ({ T, label, textarea, error, ...props }) => {
  const Tag = textarea ? 'textarea' : 'input';
  const borderColor = error ? '#ef4444' : T.line2;

  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span className="mono" style={{ fontSize: 11, color: T.dim, letterSpacing: 1 }}>{label}</span>
      <Tag {...props} style={{
        padding: '12px 14px', borderRadius: 6, border: `1px solid ${borderColor}`,
        background: T.bg, color: T.text, fontSize: 14, outline: 'none',
        fontFamily: "'Inter Tight', sans-serif", resize: textarea ? 'vertical' : 'none',
        transition: 'border-color 0.2s',
      }} />
      {error && <span style={{ fontSize: 12, color: '#ef4444', marginTop: 2 }}>{error}</span>}
    </label>
  );
};

