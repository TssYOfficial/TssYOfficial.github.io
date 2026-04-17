const sidebar = document.getElementById("sidebar");
const openBtn = document.getElementById("openSidebar");
const closeBtn = document.getElementById("closeSidebar");
const sidebarLinks = document.querySelectorAll(".sidebar a");

// --- ANIMATED BACKGROUND (CANVAS) ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let stars = [];
const starCount = 150;

const resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

class Star {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2;
    this.speed = Math.random() * 0.5 + 0.1;
    this.opacity = Math.random();
  }
  update() {
    this.y += this.speed + (window.scrollY * 0.001); // Move with scroll
    if (this.y > canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
    }
  }
  draw() {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const initStars = () => {
  stars = [];
  for (let i = 0; i < starCount; i++) {
    stars.push(new Star());
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    star.update();
    star.draw();
  });
  requestAnimationFrame(animate);
};

window.addEventListener('resize', () => {
  resizeCanvas();
  initStars();
});

resizeCanvas();
initStars();
animate();

// --- SIDEBAR TOGGLE ---
const toggleSidebar = (state) => {
  sidebar.classList.toggle("active", state);
  document.body.style.overflow = state ? "hidden" : "";
};

openBtn.onclick = () => toggleSidebar(true);
closeBtn.onclick = () => toggleSidebar(false);

sidebarLinks.forEach(link => {
  link.onclick = () => toggleSidebar(false);
});

// CLOSE SIDEBAR ON OUTSIDE CLICK
document.addEventListener("click", (e) => {
  if (sidebar.classList.contains("active") &&
      !sidebar.contains(e.target) &&
      !openBtn.contains(e.target)) {
    toggleSidebar(false);
  }
});

// REVEAL ANIMATION ON SCROLL
const revealCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      
      // If the entry has skill bars, animate them
      const skillBars = entry.target.querySelectorAll(".fill");
      if (skillBars.length > 0) {
        skillBars.forEach(bar => {
          bar.style.width = bar.dataset.width + "%";
        });
      }
      
      observer.unobserve(entry.target);
    }
  });
};

const revealObserver = new IntersectionObserver(revealCallback, {
  threshold: 0.1
});

document.querySelectorAll(".reveal").forEach(el => {
  revealObserver.observe(el);
});

const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTopBtn.classList.add("visible");
  } else {
    backToTopBtn.classList.remove("visible");
  }
});

backToTopBtn.onclick = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

// SMOOTH SCROLL FOR ALL ANCHOR LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 50,
        behavior: 'smooth'
      });
    }
  });
});

// --- PLAYFUL INTERACTION: SLASH EFFECT ---
document.addEventListener('mousedown', (e) => {
  const slash = document.createElement('div');
  slash.className = 'slash-effect';
  slash.style.left = e.pageX - 100 + 'px';
  slash.style.top = e.pageY + 'px';
  const rotation = Math.random() * 360;
  slash.style.setProperty('--rotation', `${rotation}deg`);
  slash.style.transform = `rotate(${rotation}deg)`;
  document.body.appendChild(slash);
  
  setTimeout(() => {
    slash.remove();
  }, 400);
});

// --- MOUSE TRACKING PARALLAX ---
const moon = document.querySelector('.background-moon');
const heroPfp = document.querySelector('.pfp');

document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 40;
  const y = (e.clientY / window.innerHeight - 0.5) * 40;
  
  if (moon) moon.style.transform = `translate(${x}px, ${y}px)`;
  if (heroPfp) heroPfp.style.transform = `translate(${-x/2}px, ${-y/2}px)`;
});
