/* HEADER */
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("visible", window.scrollY > 60);
});

/* BURGER */
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");
burger.addEventListener("click", () => mobileMenu.classList.toggle("open"));

/* YEAR */
document.getElementById("year").textContent = new Date().getFullYear();

/* FADE SECTIONS (A CHAQUE PASSAGE) */
const sections = document.querySelectorAll(".section");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle("visible", entry.isIntersecting);
  });
}, { threshold: 0.25 });

sections.forEach(section => observer.observe(section));

/* SKILLS DATA */
const skills = {
  languages: [
    { name: "JavaScript", desc: "Développement web interactif.", img: "pics/js.png" },
    { name: "Python", desc: "Scripts et automatisation.", img: "pics/python.png" },
    { name: "PHP", desc: "Développement backend.", img: "pics/php.png" },
    { name: "C#", desc: "Programmation orientée objet.", img: "pics/csharp.png" },
    { name: "SQL", desc: "Bases de données relationnelles.", img: "pics/sql.png" }
  ],
  systems: [
    { name: "Linux", desc: "Administration système.", img: "pics/linux.png" },
    { name: "Windows", desc: "Poste de travail.", img: "pics/windows.png" },
    { name: "Docker", desc: "Conteneurisation.", img: "pics/docker.png" },
    { name: "GitHub", desc: "Gestion de versions.", img: "pics/github.png" }
  ],
  network: [
    { name: "Réseaux", desc: "Bases TCP/IP.", img: "pics/network.png" },
    { name: "Raspberry Pi", desc: "Projets matériels.", img: "pics/raspberry.png" }
  ]
};

/* INIT CAROUSELS */
document.querySelectorAll(".skill-block").forEach(block => {
  const data = skills[block.dataset.block];
  let index = 0;

  const leftImg = block.querySelector(".left img");
  const mainImg = block.querySelector(".main img");
  const rightImg = block.querySelector(".right img");
  const name = block.querySelector(".skill-name");
  const desc = block.querySelector(".skill-desc");

  function render() {
    const prev = (index - 1 + data.length) % data.length;
    const next = (index + 1) % data.length;

    name.style.opacity = "0";
    desc.style.opacity = "0";

    setTimeout(() => {
      leftImg.src = data[prev].img;
      mainImg.src = data[index].img;
      rightImg.src = data[next].img;

      name.textContent = data[index].name;
      desc.textContent = data[index].desc;

      name.style.opacity = "1";
      desc.style.opacity = "1";
    }, 250);
  }

  block.querySelector(".left").onclick = () => {
    index = (index - 1 + data.length) % data.length;
    render();
  };

  block.querySelector(".right").onclick = () => {
    index = (index + 1) % data.length;
    render();
  };

  render();
});

/* GITHUB PROJECTS */
fetch("https://api.github.com/users/quentin-cllr/repos?sort=updated")
  .then(res => res.json())
  .then(repos => {
    const grid = document.getElementById("projectsGrid");
    repos
      .filter(r => !r.fork && !r.archived)
      .slice(0, 6)
      .forEach(repo => {
        grid.innerHTML += `
          <div class="skill-block">
            <h4>${repo.name}</h4>
            <p>${repo.description || ""}</p>
            <a href="${repo.html_url}" target="_blank">GitHub</a>
          </div>
        `;
      });
  });
