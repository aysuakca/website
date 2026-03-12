document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a, .btn');
    const sections = document.querySelectorAll('section');

    function showSection(targetId) {
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            // 1. Tüm section'ları gizle
            sections.forEach(section => {
                section.style.display = 'none';
                section.classList.remove('active-section');
            });

            // 2. Hedef section'ı göster
            targetSection.classList.add('active-section');
            
            // Layout bozulmaması için Hero bölümüne flex, diğerlerine block veriyoruz
            if (targetId === "#mainpage") {
                targetSection.style.display = 'flex';
            } else {
                targetSection.style.display = 'block';
            }

            // 3. Menüdeki aktiflik ışığını güncelle
            navLinks.forEach(item => item.classList.remove('active'));
            const activeNav = document.querySelector(`nav a[href="${targetId}"]`);
            if (activeNav) activeNav.classList.add('active');

            // Sayfayı en yukarı kaydır
            window.scrollTo(0, 0);
        }
    }

    // Tıklama olaylarını dinle
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Eğer link sayfa içi bir ID ise
            if (href && href.startsWith('#')) {
                e.preventDefault();
                showSection(href);
            }
        });
    });

    // SAYFA İLK AÇILDIĞINDA: Ana sayfayı göster
    showSection('#mainpage');
});