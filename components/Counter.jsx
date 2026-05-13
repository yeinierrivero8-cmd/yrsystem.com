// Counter.jsx
// Component: <Counter/>. Receives T (theme), A (accent), t (translations) as props where used.

const Counter = ({ to, suffix = '', T }) => {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        started = true;
        const start = performance.now(), dur = 1400;
        const step = (t) => {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(to * eased);
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  const formatted = to >= 100 && Number.isInteger(to)
    ? Math.round(n).toString()
    : (to % 1 === 0 ? Math.round(n).toString() : n.toFixed(2));
  return <span ref={ref}>{formatted}{suffix}</span>;
};

