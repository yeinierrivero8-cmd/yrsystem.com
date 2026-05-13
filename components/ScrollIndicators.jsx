// ScrollIndicators.jsx — Progress bar + Back-to-top button

const { useState, useRef, useEffect } = React;

const ScrollIndicators = ({ T, A }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const progressRef = useRef(null);
  const backToTopRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const progress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (progressRef.current) {
        gsap.set(progressRef.current, { scaleX: progress / 100 });
      }
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    gsap.to(window, { scrollTo: 0, duration: 0.8, ease: 'power2.inOut' });
  };

  return (
    <>
      {/* Progress bar */}
      <div
        ref={progressRef}
        data-gsap="progress-bar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: 2,
          background: `linear-gradient(90deg, ${A.c}, ${A.soft})`,
          transformOrigin: 'left',
          zIndex: 100,
          pointerEvents: 'none',
        }}
      />

      {/* Back-to-top button */}
      {showBackToTop && (
        <button
          ref={backToTopRef}
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: A.c,
            color: A.ink,
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: 20,
            zIndex: 50,
            boxShadow: `0 10px 30px -10px ${A.c}`,
          }}
        >
          ↑
        </button>
      )}
    </>
  );
};
