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

/* ---------- Theme toggle (light / dark) with persistence ---------- */
function initTheme() {
    const root = document.documentElement;
    const checkbox = document.querySelector('.theme-switch__checkbox');
    if (!checkbox) return;
    // The head script already set data-theme; reflect it on the switch (checked = dark).
    checkbox.checked = root.getAttribute('data-theme') === 'dark';
    checkbox.addEventListener('change', () => {
        const theme = checkbox.checked ? 'dark' : 'light';
        root.setAttribute('data-theme', theme);
        try { localStorage.setItem('theme', theme); } catch (e) {}
    });
    // Follow OS changes only while the user hasn't made an explicit choice.
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', (e) => {
        let stored;
        try { stored = localStorage.getItem('theme'); } catch (err) {}
        if (stored === 'light' || stored === 'dark') return;
        const theme = e.matches ? 'dark' : 'light';
        root.setAttribute('data-theme', theme);
        checkbox.checked = e.matches;
    });
}

/* ---------- Matrix katakana backdrop (hero, dark mode only) ---------- */
function initMatrix() {
    const host = document.querySelector('.hero-matrix');
    if (!host || host.querySelector('.jp-matrix')) return;
    const glyphs = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ';
    const grid = document.createElement('div');
    grid.className = 'jp-matrix';
    const COUNT = 320; // overflow:hidden clips the surplus to the hero box
    let html = '';
    for (let i = 0; i < COUNT; i++) {
        html += '<span>' + glyphs.charAt(Math.floor(Math.random() * glyphs.length)) + '</span>';
    }
    grid.innerHTML = html;
    host.appendChild(grid);
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
    initTheme();
    initMatrix();
    initScrollSpy();
});
