// Sidebar openen/sluiten
const menuButton = document.getElementById("menuButton");
const closeButton = document.getElementById("closeButton");
const sidebar = document.getElementById("sidebar");

menuButton.onclick = () => {
  sidebar.classList.add("active");
};

closeButton.onclick = () => {
  sidebar.classList.remove("active");
};

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function(e){
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior:"smooth"
    });

    sidebar.classList.remove("active");
  });
});

// Scroll reveal animatie
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      entry.target.style.transition = "all 0.8s ease";
    }
  });
});

document.querySelectorAll(".reveal").forEach(el => {
  observer.observe(el);
});
