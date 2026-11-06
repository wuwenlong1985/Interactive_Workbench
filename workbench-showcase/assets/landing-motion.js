(() => {
  const revealNodes = document.querySelectorAll('#workbench .sect-head,#workbench .feature,#workflow .sect-head,#workflow .step,.closing-copy,.closing-flow');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  revealNodes.forEach((node) => node.classList.add('reveal'));
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealNodes.forEach((node) => node.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -36px 0px' });
  revealNodes.forEach((node) => observer.observe(node));
})();
