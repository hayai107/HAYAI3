const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const starField = document.querySelector('.stars');
if (starField) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 48; i++) {
    const star = document.createElement('i');
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${-Math.random() * 10}s`;
    star.style.animationDuration = `${7 + Math.random() * 8}s`;
    fragment.append(star);
  }
  starField.append(fragment);
}
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06 });
  document.querySelectorAll('.reveal').forEach(section => observer.observe(section));
  document.documentElement.classList.add('motion');
}
