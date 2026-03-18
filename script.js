document.addEventListener('DOMContentLoaded', () => {

    const navLinks = document.querySelectorAll('nav a, .btn, .btn2');
    const sections = document.querySelectorAll('section');

    function showSection(targetId) {

        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;

        // tüm sectionları gizle
        sections.forEach(section => {
            section.style.display = 'none';
            section.classList.remove('active-section');
        });

        // hedef section
        targetSection.classList.add('active-section');

        if (targetId === "#mainpage") {
            targetSection.style.display = 'flex';
        } else {
            targetSection.style.display = 'block';
        }

        // aktif menü
        navLinks.forEach(item => item.classList.remove('active'));
        const activeNav = document.querySelector(`nav a[href="${targetId}"]`);
        if (activeNav) activeNav.classList.add('active');

        window.scrollTo(0, 0);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {

            const href = this.getAttribute('href');

            if (href && href.startsWith('#')) {
                e.preventDefault();
                showSection(href);
            }

        });
    });

    showSection('#mainpage');

    // Sayaç animasyonu - mainpage gösterildikten hemen sonra
    function runCounter(el) {
        const target = parseInt(el.dataset.to);
        const dur = 2000;
        const t0 = performance.now();
        const ease = t => 1 - Math.pow(1 - t, 3);
        function tick(now) {
            const p = Math.min((now - t0) / dur, 1);
            el.textContent = Math.floor(ease(p) * target);
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = target;
        }
        requestAnimationFrame(tick);
    }
    document.querySelectorAll('.ctr').forEach(runCounter);

});