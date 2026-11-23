
document.addEventListener("DOMContentLoaded", () => {


    // ==================================================
    // 01. ÍCONES LUCIDE
    // ==================================================

    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    } else {
        console.error("Lucide não foi carregado corretamente.");
    }


    // ==================================================
    // 02. MENU RESPONSIVO
    // ==================================================

    const menuButton = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-link");

    function closeMenu() {
        if (!menuButton || !navLinks) return;

        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menu");
    }

    if (menuButton && navLinks) {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menu");

        menuButton.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Fechar menu" : "Abrir menu"
            );
        });

        links.forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        document.addEventListener("click", event => {
            if (
                navLinks.classList.contains("open") &&
                !navLinks.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {
                closeMenu();
            }
        });
    }

    // ==================================================
    // 02.1. EFEITO DO CABEÇALHO NA ROLAGEM
    // ==================================================

    const header = document.querySelector(".header");

    if (header) {
        function updateHeader() {
            header.classList.toggle("scrolled", window.scrollY > 20);
        }

        updateHeader();

        window.addEventListener("scroll", updateHeader, {
            passive: true
        });
    }

    // ==================================================
    // 03. DESTAQUE DA SEÇÃO ATIVA NO MENU
    // ==================================================

    const sections = document.querySelectorAll("main section[id]");

    function setActiveLink(sectionId) {
        links.forEach(link => {
            const isActive = link.getAttribute("href") === `#${sectionId}`;

            link.classList.toggle("active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    if ("IntersectionObserver" in window && sections.length > 0) {
        const sectionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                setActiveLink(entry.target.id);
            });
        }, {
            rootMargin: "-20% 0px -55% 0px",
            threshold: 0
        });

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    } else if (sections.length > 0) {
        setActiveLink(sections[0].id);
    }


    // ==================================================
    // 04. ANO AUTOMÁTICO DO RODAPÉ
    // ==================================================

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // ==================================================
    // 05. ANIMAÇÕES AO ROLAR A PÁGINA
    // ==================================================

    const animatedElements = document.querySelectorAll(
        [
            ".hero-content",
            ".hero-visual",
            ".about-heading",
            ".about-intro",
            ".about-highlight",
            ".technologies",
            ".about-grid",
            ".section-heading",
            ".project-card",
            ".contact-grid"
        ].join(", ")
    );

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!reducedMotion && "IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.08,
            rootMargin: "0px 0px -30px 0px"
        });

        animatedElements.forEach(element => {
            element.classList.add("reveal");
            revealObserver.observe(element);
        });
    }

});
