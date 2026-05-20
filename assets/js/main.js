/* ---------- Tab switching (scope-aware: each .tab-bar controls only its sibling .tab-panels) ---------- */
function initTabs() {
    document.querySelectorAll('.tab-bar').forEach(bar => {
        const scope = bar.parentElement;
        const buttons = Array.from(bar.querySelectorAll('.tab-btn'));
        const panels = Array.from(scope.querySelectorAll(':scope > .tab-panel'));
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = 'panel-' + btn.dataset.tab;
                buttons.forEach(b => b.classList.toggle('active', b === btn));
                panels.forEach(p => p.classList.toggle('active', p.id === target));
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
