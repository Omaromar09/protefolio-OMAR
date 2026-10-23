import gsap from 'gsap';

export function initMagneticButtons() {
  const magnets = document.querySelectorAll('[data-magnetic]');

  magnets.forEach((el) => {
    let boundRect = null;

    const onMouseEnter = () => {
      boundRect = el.getBoundingClientRect();
    };

    const onMouseMove = (e) => {
      if (!boundRect) boundRect = el.getBoundingClientRect();
      const x = e.clientX - boundRect.left - boundRect.width / 2;
      const y = e.clientY - boundRect.top - boundRect.height / 2;

      gsap.to(el, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    const onMouseLeave = () => {
      boundRect = null;
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto'
      });
    };

    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);
  });
}
