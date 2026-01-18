/* HEADER */
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
    header.classList.toggle("visible", window.scrollY > 60);
});

/* BURGER */
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");

burger.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
});
document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => mobileMenu.classList.remove("open"));
});

/* YEAR */
document.getElementById("year").textContent = new Date().getFullYear();

/* SECTION FADE : rejoue */
const sections = document.querySelectorAll(".section");
const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
        else entry.target.classList.remove("visible");
    });
}, { threshold: 0.25 });
sections.forEach(sec => io.observe(sec));

/* H1 lettres : wrap */
const heroName = document.getElementById("heroName");
if (heroName) {
    const text = heroName.textContent;
    heroName.textContent = "";
    for (const ch of text) {
        if (ch === " ") heroName.appendChild(document.createTextNode(" "));
        else {
            const span = document.createElement("span");
            span.className = "letter";
            span.textContent = ch;
            heroName.appendChild(span);
        }
    }
}

/* SKILLS DATA (images dans /pics) */
const SKILLS = {
    languages: [
        { name: "C#", img: "pics/languages/csharp.png", desc: "Applications desktop, POO" },
        { name: "JavaScript", img: "pics/languages/js.png", desc: "DOM, async, appels API REST" },
        { name: "HTML", img: "pics/languages/html.png", desc: "Structure sémantique des pages" },
        { name: "Python", img: "pics/languages/python.png", desc: "Scripts, automatisation" },
        { name: "CSS", img: "pics/languages/css.png", desc: "Responsive, Flexbox, UI/UX" },
        { name: "PHP", img: "pics/languages/php.png", desc: "Back-end web, CRUD, sessions" }
    ],

    tools: [
        { name: "GitHub", img: "pics/tools/github.png", desc: "Gestion de projets, branches" },
        { name: "Docker", img: "pics/tools/docker.png", desc: "Conteneurisation de projets simples" },
        { name: "Linux", img: "pics/tools/linux.png", desc: "Commandes, environnement" },
        { name: "Bash", img: "pics/tools/bash.png", desc: "Scripts et automatisation" },
        { name: "Windows", img: "pics/tools/windows.png", desc: "Environnement de développement" },
        { name: "Raspberry Pi", img: "pics/tools/raspberry.png", desc: "Projets techniques légers et serveur" }
    ],

    dev: [
        { name: "POO", img: "pics/dev/poo1.png", desc: "Classes, interfaces, conception" },
        { name: "Développement web", img: "pics/dev/www.png", desc: "Front-end et back-end" },
        { name: "API REST", img: "pics/dev/api.png", desc: "Routes CRUD, échanges JSON" },
        { name: "Bases de données", img: "pics/dev/database.png", desc: "Modélisation, requêtes SQL" },
        { name: "Client / serveur", img: "pics/dev/serveur-client.png", desc: "Requêtes, réponses, découplage" },
        { name: "Réseaux", img: "pics/dev/network.png", desc: "Fondamentales : TCP/IP, HTTP, DNS" }
    ]
};


/* =========================
   COMPETENCES – MODE LISTE / CAROUSEL
   ========================= */

const competencesSection = document.getElementById("competences");
const toggleBtn = document.getElementById("skillsViewToggle");

/* remplir les listes */
document.querySelectorAll(".skill-block").forEach(block => {
    const key = block.dataset.block;
    const data = SKILLS[key];
    if (!data) return;

    const list = block.querySelector(".skills-list");

    data.forEach(skill => {
        const li = document.createElement("li");
        li.innerHTML = `
  <img src="${skill.img}" alt="">
  <span>${skill.name}</span>
`;
        list.appendChild(li);
    });
});

/* toggle vue */
toggleBtn.addEventListener("click", () => {
    const isList = competencesSection.classList.toggle("list-view");
    toggleBtn.textContent = isList ? "Voir en carousel" : "Voir en liste";
});

/* =========================
   COMPETENCES – CAROUSEL 3D (FIX)
   ========================= */
document.querySelectorAll(".skill-block").forEach(block => {
    const key = block.dataset.block;
    const data = SKILLS[key];
    if (!data || data.length < 3) return;

    const carousel = block.querySelector(".carousel");
    let items = Array.from(carousel.querySelectorAll(".item"));
    const nameEl = block.querySelector(".skill-name");
    const descEl = block.querySelector(".skill-desc");

    let index = 0;
    let locked = false;

    function updateContent() {
        const left = (index - 1 + data.length) % data.length;
        const right = (index + 1) % data.length;

        items[0].querySelector("img").src = data[left].img;
        items[1].querySelector("img").src = data[index].img;
        items[2].querySelector("img").src = data[right].img;
        nameEl.classList.remove("show");
        descEl.classList.remove("show");

        // 🔑 FORCE LE NAVIGATEUR À VOIR L'ÉTAT SANS .show
        void nameEl.offsetHeight;

        nameEl.textContent = data[index].name;
        descEl.textContent = data[index].desc;

        nameEl.classList.add("show");
        descEl.classList.add("show");
    }

    function applyClasses() {
        items[0].className = "item left";
        items[1].className = "item center";
        items[2].className = "item right";
    }

    function slide(direction) {
        if (locked) return;
        locked = true;

        if (direction === 1) {
            // vers la droite
            index = (index + 1) % data.length;
            items.push(items.shift()); // rotation du tableau
        }

        if (direction === -1) {
            // vers la gauche
            index = (index - 1 + data.length) % data.length;
            items.unshift(items.pop());
        }

        updateContent();
        applyClasses();

        setTimeout(() => locked = false, 600); // match CSS transition
    }

    carousel.addEventListener("click", e => {
        const item = e.target.closest(".item");
        if (!item) return;

        if (item.classList.contains("right")) slide(1);
        if (item.classList.contains("left")) slide(-1);
    });
    carousel.querySelector(".arrow.left")
        .addEventListener("click", e => {
            e.stopPropagation();
            slide(-1);
        });

    carousel.querySelector(".arrow.right")
        .addEventListener("click", e => {
            e.stopPropagation();
            slide(1);
        });

    updateContent();
    applyClasses();
    nameEl.classList.add("show");
    descEl.classList.add("show");
});

/* PROJETS */
const USER = "quentin-cllr";
const grid = document.getElementById("projectsGrid");

fetch(`https://api.github.com/users/${USER}/repos?sort=updated`)
    .then(res => res.json())
    .then(repos => {
        grid.innerHTML = "";

        const list = repos
            .filter(r => !r.fork && !r.archived)
            .slice(0, 6);

        if (!list.length) {
            grid.innerHTML = `<div class="project-skeleton">Aucun projet public trouvé.</div>`;
            return;
        }

        list.forEach(repo => {
            const card = document.createElement("article");
            card.className = "project-card";
            card.innerHTML = `
        <h4>${repo.name}</h4>
        <p>${repo.description || "Projet personnel ou scolaire."}</p>
        <a class="project-link" href="${repo.html_url}" target="_blank" rel="noreferrer">Voir sur GitHub →</a>
      `;
            grid.appendChild(card);
        });
    })
    .catch(() => {
        grid.innerHTML = `<div class="project-skeleton">Impossible de charger les projets.</div>`;
    });