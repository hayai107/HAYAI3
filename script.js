const song = document.querySelector('#our-song');
const musicToggle = document.querySelector('#music-toggle');
const musicLabel = document.querySelector('#music-label');
const musicStatus = document.querySelector('#music-status');
if (song && musicToggle && musicLabel && musicStatus) {
  song.volume = 0.55;
  const updateMusic = () => {
    const playing = !song.paused;
    musicToggle.classList.toggle('is-playing', playing);
    musicToggle.setAttribute('aria-pressed', String(playing));
    musicToggle.setAttribute('aria-label', playing ? 'Pausar música' : 'Reproducir música');
    musicLabel.textContent = playing ? 'Pausar este instante' : 'Escuchar contigo';
  };
  musicToggle.addEventListener('click', async () => {
    musicStatus.textContent = '';
    if (!song.paused) {
      song.pause();
      return;
    }
    musicToggle.disabled = true;
    musicLabel.textContent = 'Preparando la música…';
    try {
      await song.play();
    } catch {
      musicStatus.textContent = 'No se pudo reproducir. Inténtalo otra vez.';
    } finally {
      musicToggle.disabled = false;
      updateMusic();
    }
  });
  song.addEventListener('play', updateMusic);
  song.addEventListener('pause', updateMusic);
  song.addEventListener('error', () => {
    musicStatus.textContent = 'No se pudo cargar la canción. Inténtalo otra vez.';
    updateMusic();
  });
}

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
