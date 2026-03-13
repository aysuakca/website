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

});