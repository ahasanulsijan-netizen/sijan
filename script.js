document.getElementById('year').textContent = new Date().getFullYear();

if (Array.isArray(window.portfolioSocials)) {
  document.querySelectorAll('[data-social-links]').forEach(container => {
    const links = window.portfolioSocials.flatMap(social => {
      if (!social.url || !social.label) return [];
      let url;
      try { url = new URL(social.url); } catch { return []; }
      if (!['https:', 'mailto:'].includes(url.protocol)) return [];
      if (container.hasAttribute('data-exclude-email') && url.protocol === 'mailto:') return [];
      const link = document.createElement('a');
      link.href = url.href;
      link.textContent = `${social.label} ↗`;
      if (url.protocol === 'https:') {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
      return [link];
    });
    container.replaceChildren(...links);
  });
}
