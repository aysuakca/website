document.addEventListener('DOMContentLoaded', () => {

    const navLinks = document.querySelectorAll('nav a, .btn, .btn2');
    const sections = document.querySelectorAll('section');

    // Detay section'larının listesi (nav'da olmayan, services altında scroll ile görünen)
    const detaySections = [
        '#web-tasarim-detay',
        '#seo-detay',
        '#ads-detay',
        '#lokalizasyon-detay',
        '#qa-detay',
        '#analitik-detay',
        '#bakim-detay',
        '#website-detay'
    ];

    function showSection(targetId) {

        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;

        // Eğer hedef bir detay section'ıysa:
        // #services ve ilgili detay section'larını göster, sonra scroll yap
        if (detaySections.includes(targetId)) {
            // Tüm section'ları gizle
            sections.forEach(section => {
                section.style.display = 'none';
                section.classList.remove('active-section');
            });

            // #services section'ını göster
            const servicesSection = document.querySelector('#services');
            if (servicesSection) {
                servicesSection.style.display = 'block';
                servicesSection.classList.add('active-section');
            }

            // Hedef detay section'ını göster
            targetSection.style.display = 'block';
            targetSection.classList.add('active-section');

            // Animasyonlu elementleri yeniden tetikle (fadeUp fill-mode:both nedeniyle opacity:0 kalabilir)
            // Kısa gecikmeyle display:block'un tarayıcıya işlenmesini bekle
            setTimeout(() => {
                targetSection.querySelectorAll('*').forEach(el => {
                    const computed = getComputedStyle(el);
                    if (computed.animationName && computed.animationName !== 'none') {
                        el.style.animation = 'none';
                        el.offsetHeight; // reflow tetikle
                        el.style.animation = '';
                    }
                });
            }, 20);

            // Nav aktif durumu
            navLinks.forEach(item => item.classList.remove('active'));
            const activeNav = document.querySelector(`nav a[href="#services"]`);
            if (activeNav) activeNav.classList.add('active');

            // Detay section'ına scroll yap
            setTimeout(() => {
                const top = targetSection.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: 'smooth' });
            }, 50);

            return;
        }

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

    // "Detayları Gör" gibi service-link tıklamalarını da yakala
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href]');
        if (!link) return;
        const href = link.getAttribute('href');
        if (href && detaySections.includes(href)) {
            e.preventDefault();
            showSection(href);
        }
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