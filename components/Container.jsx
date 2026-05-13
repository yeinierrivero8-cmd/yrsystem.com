// Container.jsx
// Wrapper component for max-width content

const Container = ({ children, style }) => (
  <div style={{
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 20,
    paddingRight: 20,
    ...style
  }}>
    {children}
  </div>
);
