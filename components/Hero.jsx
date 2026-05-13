// Hero.jsx
// Component: <Hero/>. Full-featured professional hero

const { useState, useRef, useEffect } = React;

const Hero = ({ T, A, t, lang, showLogo }) => {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const spotlightRef = useRef(null);
  const [typedText, setTypedText] = useState('');
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [counter3, setCounter3] = useState(0);
  const [visible, setVisible] = useState(false);

  const words = ['sistemas que escalan.', 'software que impacta.', 'código que funciona.'];
  const wordRef = useRef(0);
  const charRef = useRef(0);
  const deletingRef = useRef(false);

  // Typewriter effect
  useEffect(() => {
    const tick = () => {
      const word = words[wordRef.current];
      if (!deletingRef.current) {
        charRef.current++;
        setTypedText(word.slice(0, charRef.current));
        if (charRef.current === word.length) {
          deletingRef.current = true;
          setTimeout(tick, 1800);
          return;
        }
      } else {
        charRef.current--;
        setTypedText(word.slice(0, charRef.current));
        if (charRef.current === 0) {
          deletingRef.current = false;
          wordRef.current = (wordRef.current + 1) % words.length;
        }
      }
      setTimeout(tick, deletingRef.current ? 40 : 75);
    };
    const t = setTimeout(tick, 600);
    return () => clearTimeout(t);
  }, []);

  // Counter animation
  useEffect(() => {
    setTimeout(() => setVisible(true), 300);
    const animCount = (target, setter, delay) => {
      setTimeout(() => {
        let n = 0;
        const step = Math.ceil(target / 40);
        const iv = setInterval(() => {
          n = Math.min(n + step, target);
          setter(n);
          if (n >= target) clearInterval(iv);
        }, 40);
      }, delay);
    };
    animCount(15, setCounter1, 500);
    animCount(4, setCounter2, 700);
    animCount(12, setCounter3, 900);
  }, []);

  // Particles canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.2 + 0.3,
      op: Math.random() * 0.12 + 0.03,
      red: Math.random() < 0.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.red ? `rgba(255,60,80,${p.op})` : `rgba(200,200,255,${p.op})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,60,80,${(1 - d / 100) * 0.05})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  // Spotlight mouse follow
  useEffect(() => {
    const el = spotlightRef.current;
    if (!el) return;
    const move = (e) => {
      el.style.left = e.clientX + 'px';
      el.style.top = e.clientY + 'px';
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const handleInitiateProject = () => {
    const contact = Array.from(document.querySelectorAll('section')).find(s => s.textContent.includes('Contáctame')) ||
                    Array.from(document.querySelectorAll('section')).pop();
    if (contact) contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleViewPortfolio = () => {
    const sections = Array.from(document.querySelectorAll('section'));
    const portfolio = sections.find(s =>
      s.textContent.includes('Sistema de Gestión') ||
      s.textContent.includes('Casos de éxito') ||
      s.textContent.includes('Portfolio') ||
      s.textContent.includes('Bot de IA para Atención')
    );
    if (portfolio) portfolio.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else window.scrollBy({ top: window.innerHeight * 4, behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 40px 80px',
      }}
    >
      {/* Spotlight */}
      <div
        ref={spotlightRef}
        style={{
          position: 'fixed',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${A.c}12 0%, transparent 70%)`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 1,
          transition: 'left 0.08s ease, top 0.08s ease',
        }}
      />

      {/* Particles */}
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />

      {/* Grid */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(${A.c}06 1px, transparent 1px), linear-gradient(90deg, ${A.c}06 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }} />

      {/* Big BG text */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: 'clamp(120px, 22vw, 280px)',
        fontWeight: 900,
        color: 'transparent',
        WebkitTextStroke: `1px ${A.c}08`,
        letterSpacing: -10,
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: 1,
        whiteSpace: 'nowrap',
      }}>YR</div>

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%', maxWidth: 1100,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 0,
      }}>

        {/* Tag line */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.7s ease 0.1s',
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28,
        }}>
          <div style={{ width: 40, height: 1, background: A.c }} />
          <span style={{ fontSize: 11, letterSpacing: 5, color: A.c, fontWeight: 700, textTransform: 'uppercase' }}>
            Full Stack Developer & AI Specialist
          </span>
          <div style={{ width: 40, height: 1, background: A.c }} />
        </div>

        {/* Main title */}
        <h1 style={{
          fontSize: 'clamp(42px, 8vw, 88px)',
          fontWeight: 900,
          lineHeight: 1.0,
          letterSpacing: -3,
          textAlign: 'center',
          margin: '0 0 10px 0',
          color: T.text,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) skewY(0deg)' : 'translateY(60px) skewY(2deg)',
          transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s',
        }}>
          Transformo ideas en
        </h1>

        {/* Typewriter line */}
        <h1 style={{
          fontSize: 'clamp(42px, 8vw, 88px)',
          fontWeight: 900,
          lineHeight: 1.1,
          letterSpacing: -3,
          textAlign: 'center',
          margin: '0 0 36px 0',
          color: A.c,
          minHeight: 'clamp(50px, 9vw, 100px)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(60px)',
          transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s',
        }}>
          {typedText}
          <span style={{
            display: 'inline-block', width: 3, height: '0.85em',
            background: A.c, marginLeft: 4, verticalAlign: 'middle',
            animation: 'blink 0.8s step-end infinite',
          }} />
        </h1>

        {/* Sub */}
        <p style={{
          fontSize: 17, color: T.dim, lineHeight: 1.8,
          maxWidth: 620, textAlign: 'center',
          margin: '0 auto 44px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.7s ease 0.6s',
        }}>
          Construcción de software de alto impacto — automatización, inteligencia artificial y backend robusto para empresas que no aceptan mediocridad.
        </p>

        {/* Buttons */}
        <div style={{
          display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap',
          marginBottom: 70,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.7s ease 0.75s',
        }}>
          <button
            onClick={handleInitiateProject}
            style={{
              padding: '16px 44px', fontSize: 13, fontWeight: 800,
              border: 'none',
              background: A.c,
              color: '#fff',
              cursor: 'pointer', letterSpacing: 2, textTransform: 'uppercase',
              clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)',
              boxShadow: `0 0 40px ${A.c}50`,
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = `0 0 60px ${A.c}80`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = `0 0 40px ${A.c}50`; }}
          >
            Iniciar Proyecto
          </button>
          <button
            onClick={handleViewPortfolio}
            style={{
              padding: '16px 44px', fontSize: 13, fontWeight: 800,
              border: `2px solid ${A.c}50`,
              background: 'transparent',
              color: T.text,
              cursor: 'pointer', letterSpacing: 2, textTransform: 'uppercase',
              clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = A.c; e.currentTarget.style.color = A.c; e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = `${A.c}50`; e.currentTarget.style.color = T.text; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            Ver Portfolio
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2, width: '100%', maxWidth: 680,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.7s ease 0.9s',
        }}>
          {[
            { val: counter1, suffix: '+', label: 'Proyectos' },
            { val: counter2, suffix: '+', label: 'Años' },
            { val: counter3, suffix: '', label: 'Clientes USA' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '28px 20px', textAlign: 'center',
              border: `1px solid ${A.c}20`,
              background: `${A.c}06`,
              backdropFilter: 'blur(10px)',
              position: 'relative', overflow: 'hidden',
              transition: 'border-color 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = `${A.c}60`}
              onMouseLeave={e => e.currentTarget.style.borderColor = `${A.c}20`}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 2, background: A.c, opacity: 0.4 }} />
              <p style={{ fontSize: 44, fontWeight: 900, color: A.c, margin: 0, letterSpacing: -2, lineHeight: 1 }}>
                {s.val}{s.suffix}
              </p>
              <p style={{ fontSize: 11, color: T.dim, margin: '10px 0 0 0', letterSpacing: 3, textTransform: 'uppercase' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Tech Stack marquee */}
        <div style={{
          width: '100vw', marginLeft: 'calc(-50vw + 50%)',
          overflow: 'hidden', marginTop: 60,
          borderTop: `1px solid ${A.c}15`,
          borderBottom: `1px solid ${A.c}15`,
          padding: '14px 0',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.7s ease 1.05s',
        }}>
          <div style={{
            display: 'flex', gap: 50,
            animation: 'marquee 18s linear infinite',
            whiteSpace: 'nowrap',
          }}>
            {['Python', 'React', 'Flask', 'SQLite', 'Node.js', 'AI & ML', 'REST APIs', 'Docker', 'PostgreSQL', 'JavaScript',
              'Python', 'React', 'Flask', 'SQLite', 'Node.js', 'AI & ML', 'REST APIs', 'Docker', 'PostgreSQL', 'JavaScript'].map((tech, i) => (
              <span key={i} style={{
                fontSize: 11, letterSpacing: 4, textTransform: 'uppercase',
                color: i % 7 === 0 ? A.c : i % 3 === 0 ? T.text : 'oklch(0.72 0.006 240)',
                fontWeight: i % 7 === 0 ? 700 : 500,
                opacity: 1,
              }}>
                {i % 5 === 0 ? '// ' : ''}{tech}
              </span>
            ))}
          </div>
        </div>

        {/* Service cards row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 2, width: '100%', marginTop: 2,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.7s ease 1.1s',
        }}>
          {[
            { num: '01', title: 'Automatización', desc: 'Procesos críticos sin intervención manual. Tu negocio en piloto automático.' },
            { num: '02', title: 'AI & Machine Learning', desc: 'Bots, análisis predictivo y decisiones automatizadas con IA real.' },
            { num: '03', title: 'Full Stack', desc: 'Frontend, backend y base de datos. Sistemas completos y escalables.' },
            { num: '04', title: 'Software a Medida', desc: 'Aplicaciones construidas exactamente para tu negocio. Sin límites.' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '30px 24px',
              border: `1px solid ${A.c}12`,
              background: `${A.c}04`,
              position: 'relative', overflow: 'hidden',
              cursor: 'default',
              transition: 'border-color 0.3s, background 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${A.c}40`; e.currentTarget.style.background = `${A.c}08`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = `${A.c}12`; e.currentTarget.style.background = `${A.c}04`; }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: A.c, opacity: 0.3 }} />
              <span style={{ fontSize: 10, color: A.c, letterSpacing: 3, fontWeight: 700, display: 'block', marginBottom: 12 }}>{s.num}</span>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: T.text, margin: '0 0 10px 0', letterSpacing: -0.5 }}>{s.title}</h3>
              <p style={{ fontSize: 12, color: T.dim, margin: 0, lineHeight: 1.7 }}>{s.desc}</p>
              <span style={{ position: 'absolute', bottom: 16, right: 20, fontSize: 18, color: `${A.c}30` }}>↗</span>
            </div>
          ))}
        </div>

        {/* Availability badge + scroll */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          width: '100%', marginTop: 32, paddingTop: 24,
          borderTop: `1px solid ${A.c}10`,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.7s ease 1.3s',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
            <span style={{ fontSize: 11, color: '#22c55e', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700 }}>
              Disponible para proyectos
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 10, letterSpacing: 4, color: T.dim, textTransform: 'uppercase' }}>Explorar</span>
            <div style={{
              width: 1, height: 30, background: `linear-gradient(to bottom, ${A.c}, transparent)`,
              animation: 'scrollPulse 1.5s ease-in-out infinite',
            }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes scrollPulse { 0%,100%{transform:scaleY(1);opacity:0.4} 50%{transform:scaleY(1.3);opacity:0.8} }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
      `}</style>
    </section>
  );
};
