// gsap-animations.jsx — Global GSAP + AOS setup & utilities

gsap.registerPlugin(ScrollTrigger);

const GsapUtils = {
  // Hero timeline — staggered fade + slide
  heroTimeline: (heroRef) => {
    if (!heroRef) return;
    const tl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power2.out' } });
    tl.from(heroRef.querySelector('.hero-badge'), { opacity: 0, y: 20 }, 0)
      .from(heroRef.querySelector('.hero-kicker'), { opacity: 0, y: 20 }, 0.15)
      .from(heroRef.querySelector('.hero-title'), { opacity: 0, y: 30 }, 0.3)
      .from(heroRef.querySelector('.hero-desc'), { opacity: 0, y: 20 }, 0.5)
      .from(heroRef.querySelector('.hero-buttons'), { opacity: 0, y: 20 }, 0.65);
  },

  // Card hover 3D effect
  cardHover3D: (card) => {
    const onMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotationX: y * 10,
        rotationY: x * 10,
        duration: 0.6,
        ease: 'power2.out',
        transformOrigin: 'center center',
        perspective: 1000,
      });
    };
    const onMouseLeave = () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    };
    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);
    return () => {
      card.removeEventListener('mousemove', onMouseMove);
      card.removeEventListener('mouseleave', onMouseLeave);
    };
  },

  // Scroll reveal — fade + slide on view
  scrollReveal: (element, options = {}) => {
    const defaults = { duration: 0.8, y: 40, opacity: 0, ease: 'power2.out' };
    ScrollTrigger.create({
      trigger: element,
      onEnter: () => gsap.from(element, { ...defaults, ...options }),
      once: true,
    });
  },

  // Pulse glow animation
  pulseGlow: (element, color = '#86efac') => {
    gsap.to(element, {
      boxShadow: `0 0 20px ${color}, 0 0 40px ${color}`,
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });
  },

  // Button glow on focus
  buttonGlow: (btn, color = '#86efac') => {
    btn.addEventListener('focus', () => {
      gsap.to(btn, {
        boxShadow: `0 0 20px ${color}, 0 0 10px ${color}`,
        duration: 0.3,
      });
    });
    btn.addEventListener('blur', () => {
      gsap.to(btn, {
        boxShadow: 'none',
        duration: 0.3,
      });
    });
  },

  // Form input glow
  inputGlow: (input, color = '#86efac') => {
    input.addEventListener('focus', () => {
      gsap.to(input, {
        borderColor: color,
        boxShadow: `0 0 15px ${color}80`,
        duration: 0.3,
      });
    });
    input.addEventListener('blur', () => {
      gsap.to(input, {
        borderColor: 'currentColor',
        boxShadow: 'none',
        duration: 0.3,
      });
    });
  },

  // Success checkmark animation
  checkmarkAnimation: (element) => {
    gsap.from(element, {
      opacity: 0,
      scale: 0,
      duration: 0.5,
      ease: 'back.out',
    });
  },

  // Scroll progress line
  setupProgressBar: () => {
    const progressBar = document.querySelector('[data-gsap="progress-bar"]');
    if (!progressBar) return;
    gsap.to(progressBar, {
      scaleX: 1,
      scrollTrigger: {
        trigger: 'body',
        scrub: true,
        onUpdate: (self) => {
          gsap.set(progressBar, { scaleX: self.progress });
        },
      },
    });
  },

  // Floating button pulse
  floatingButtonPulse: (button) => {
    gsap.to(button, {
      y: -5,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });
  },

  // Staggered card entrance
  staggerCards: (container, selector = '.card') => {
    const cards = container.querySelectorAll(selector);
    gsap.from(cards, {
      opacity: 0,
      y: 40,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        once: true,
      },
    });
  },
};

// Auto-initialize AOS on mount
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 800,
    easing: 'ease-out-quad',
    once: true,
    offset: 100,
  });

  // Setup progress bar if exists
  GsapUtils.setupProgressBar();
});

window.GsapUtils = GsapUtils;
