document.addEventListener("DOMContentLoaded", () => {

    /* ===== Efeito de inclinação e brilho nos cards ===== */
    const cards = document.querySelectorAll(".game-card");

    cards.forEach(card => {
        // Garante a camada de brilho
        if (!card.querySelector(".game-card-shine")) {
            const shine = document.createElement("div");
            shine.className = "game-card-shine";
            card.appendChild(shine);
        }

        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * 10;
            const rotateX = ((centerY - y) / centerY) * 10;

            card.style.transform =
                `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;

            card.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
            card.style.setProperty("--my", `${(y / rect.height) * 100}%`);
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform =
                "perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)";
        });
    });


    /* ===== Grão de fundo, cursor personalizado e efeitos gerais ===== */
    // Grão de fundo
    const grain = document.createElement("div");
    grain.id = "fx-grain";
    document.body.appendChild(grain);

    // Cursor customizado
    const glow = document.createElement("div");
    glow.id = "fx-cursor-glow";
    const dot = document.createElement("div");
    dot.id = "fx-cursor-dot";
    document.body.appendChild(glow);
    document.body.appendChild(dot);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + "px";
        dot.style.top = mouseY + "px";
        glow.classList.add("fx-active");
        dot.classList.add("fx-active");
    });

    window.addEventListener("mouseleave", () => {
        glow.classList.remove("fx-active");
        dot.classList.remove("fx-active");
    });

    // Animação suave do brilho do cursor
    function animateGlow() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        glow.style.left = glowX + "px";
        glow.style.top = glowY + "px";
        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // Cursor cresce sobre links e botões
    const hoverables = document.querySelectorAll("a, button, input[type='submit']");
    hoverables.forEach(el => {
        el.addEventListener("mouseenter", () => dot.classList.add("fx-hover"));
        el.addEventListener("mouseleave", () => dot.classList.remove("fx-hover"));
    });

    // Revelação ao rolar a página
    const sections = document.querySelectorAll("section, main, footer, .card-grid");
    sections.forEach(sec => sec.classList.add("fx-reveal"));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fx-visible");
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(sec => observer.observe(sec));

    // Efeito magnético nos links de navegação
    const magnetics = document.querySelectorAll("nav a");
    magnetics.forEach(el => {
        el.addEventListener("mousemove", (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });
        el.addEventListener("mouseleave", () => {
            el.style.transform = "translate(0,0)";
        });
    });

    // Parallax leve nas imagens
    const images = document.querySelectorAll("img");
    images.forEach(img => img.classList.add("fx-parallax"));

    window.addEventListener("scroll", () => {
        const scrolled = window.scrollY;
        images.forEach(img => {
            const speed = 0.05;
            img.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

});