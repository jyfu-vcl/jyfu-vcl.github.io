/* ---------- Tab switching (Papers / Proposals) ---------- */
function initTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b === btn));
            document.querySelectorAll('.tab-panel').forEach(p => {
                p.classList.toggle('active', p.id === 'panel-' + target);
            });
        });
    });
}

/* ---------- Card selection: click to highlight a paper ---------- */
function initCards() {
    document.querySelectorAll('.pub-item').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('a')) return;
            const isActive = card.classList.contains('active');
            document.querySelectorAll('.pub-item.active').forEach(c => c.classList.remove('active'));
            if (!isActive) card.classList.add('active');
        });
    });
}

/* ---------- Scroll-spy: highlight current section in the nav ---------- */
function initScrollSpy() {
    const navLinks = Array.from(document.querySelectorAll('.topnav a[href^="#"]'));
    const sections = navLinks
        .map(a => document.getElementById(a.getAttribute('href').slice(1)))
        .filter(Boolean);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    sections.forEach(s => observer.observe(s));
}

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initCards();
    initScrollSpy();
});
