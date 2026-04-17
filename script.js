const sidebar = document.getElementById("sidebar");
const openBtn = document.getElementById("openSidebar");
const closeBtn = document.getElementById("closeSidebar");
const sidebarLinks = document.querySelectorAll(".sidebar a");

// --- RENDER CONTENT FROM DATA.JS ---
const renderContent = () => {
  const data = window.portfolioData;
  if (!data) {
    console.error("[SAMURAI] No portfolio data found!");
    return;
  }

  // Hero
  const heroName = document.getElementById('hero-name');
  const heroSub = document.getElementById('hero-sub');
  if (heroName) heroName.innerText = data.hero.name;
  if (heroSub) heroSub.innerText = data.hero.sub;

  // About
  const aboutText = document.getElementById('about-text');
  if (aboutText) aboutText.innerText = data.about.text;
  
  const highlightsContainer = document.getElementById('about-highlights');
  if (highlightsContainer) {
    highlightsContainer.innerHTML = data.about.highlights.map(h => `<div class="info">${h}</div>`).join('');
  }

  // Experience
  const experienceContainer = document.getElementById('experience-list');
  if (experienceContainer) {
    experienceContainer.innerHTML = data.experience.map(exp => `
      <div class="timeline-item">
        <div class="timeline-date">${exp.date}</div>
        <h3>${exp.title}</h3>
        <p>${exp.desc}</p>
      </div>
    `).join('');
  }

  // Services
  const servicesContainer = document.getElementById('services-list');
  if (servicesContainer) {
    servicesContainer.innerHTML = data.services.map(s => `
      <div class="card">
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
      </div>
    `).join('');
  }

  // Projects
  const projectsContainer = document.getElementById('projects-list');
  if (projectsContainer) {
    projectsContainer.innerHTML = data.projects.map(p => `
      <div class="card">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
      </div>
    `).join('');
  }

  // Skills
  const skillsContainer = document.getElementById('skills-list');
  if (skillsContainer) {
    skillsContainer.innerHTML = data.skills.map(s => `
      <div class="skill">
        <span>${s.name}</span>
        <div class="bar"><div class="fill" data-width="${s.level}"></div></div>
      </div>
    `).join('');
  }

  // Stats
  const statsContainer = document.getElementById('stats-list');
  if (statsContainer) {
    statsContainer.innerHTML = data.stats.map(s => `
      <div>
        <h3>${s.number}</h3>
        <p>${s.label}</p>
      </div>
    `).join('');
  }

  // Re-observe revealed elements since they were just added
  document.querySelectorAll(".reveal").forEach(el => {
    revealObserver.observe(el);
  });
};

// --- DATA INITIALIZATION ---
const initData = () => {
  renderContent();
};

// Initialize on load
window.addEventListener('DOMContentLoaded', initData);

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
  if (sidebar) {
    sidebar.classList.toggle("active", state);
    document.body.style.overflow = state ? "hidden" : "";
  }
};

if (openBtn) openBtn.onclick = () => toggleSidebar(true);
if (closeBtn) closeBtn.onclick = () => toggleSidebar(false);

if (sidebarLinks) {
  sidebarLinks.forEach(link => {
    link.onclick = () => toggleSidebar(false);
  });
}

// CLOSE SIDEBAR ON OUTSIDE CLICK
document.addEventListener("click", (e) => {
  if (sidebar && sidebar.classList.contains("active") &&
      !sidebar.contains(e.target) &&
      (!openBtn || !openBtn.contains(e.target))) {
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

if (backToTopBtn) {
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
}

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

// --- CONTACT SCROLL LOGIC ---
const contactSection = document.getElementById('contact');
const scrollToContactBtns = document.querySelectorAll('a[href="#contact"]');

scrollToContactBtns.forEach(btn => {
  btn.onclick = (e) => {
    e.preventDefault();
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 50,
        behavior: 'smooth'
      });
    }
  };
});

// --- OVERLAY SYSTEM ---
const discordOverlay = document.getElementById('discordOverlay');
const contactOverlay = document.getElementById('contactOverlay');
const adminLoginOverlay = document.getElementById('adminLoginOverlay');
const adminDashboard = document.getElementById('adminDashboard');

const openDiscordBtn = document.getElementById('openDiscordOverlay');
const openContactBtn = document.getElementById('openContactOverlay');
const openAdminLoginBtn = document.getElementById('openAdminLogin');
const loginBtn = document.getElementById('loginBtn');
const generateUpdateBtn = document.getElementById('generateUpdateBtn');

const closeOverlayBtns = document.querySelectorAll('.close-overlay');
const copyDiscordBtn = document.getElementById('copyDiscordBtn');

const toggleOverlay = (overlay, state) => {
  if (overlay) {
    overlay.classList.toggle('active', state);
    document.body.style.overflow = state ? 'hidden' : '';
  }
};

if (openDiscordBtn) openDiscordBtn.onclick = () => toggleOverlay(discordOverlay, true);
if (openContactBtn) openContactBtn.onclick = () => toggleOverlay(contactOverlay, true);
if (openAdminLoginBtn) openAdminLoginBtn.onclick = () => toggleOverlay(adminLoginOverlay, true);

// Login Logic
if (loginBtn) {
  loginBtn.onclick = () => {
    const pass = document.getElementById('adminPassword').value;
    if (pass === 'admin123') { // Simple hardcoded password
      toggleOverlay(adminLoginOverlay, false);
      toggleOverlay(adminDashboard, true);
      initDashboard();
    } else {
      alert('ACCESS DENIED. INCORRECT CODE.');
    }
  };
}

// Dashboard Tab Logic
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  };
});

// Initialize Dashboard Data
const initDashboard = () => {
  const data = window.portfolioData;
  document.getElementById('edit-hero-name').value = data.hero.name;
  document.getElementById('edit-hero-sub').value = data.hero.sub;
  document.getElementById('edit-about-text').value = data.about.text;
  document.getElementById('edit-about-highlights').value = data.about.highlights.join(', ');

  // Stats
  const statsEdit = document.getElementById('edit-stats-container');
  statsEdit.innerHTML = data.stats.map((s, i) => `
    <div class="dashboard-item">
      <input type="text" value="${s.number}" id="stat-num-${i}">
      <input type="text" value="${s.label}" id="stat-label-${i}">
    </div>
  `).join('');

  // Skills
  const skillsEdit = document.getElementById('edit-skills-container');
  skillsEdit.innerHTML = data.skills.map((s, i) => `
    <div class="dashboard-item">
      <input type="text" value="${s.name}" id="skill-name-${i}">
      <input type="range" min="0" max="100" value="${s.level}" id="skill-level-${i}" oninput="updateSkillVal(${i}, this.value)">
      <span id="skill-val-${i}">${s.level}%</span>
    </div>
  `).join('');

  // Projects
  const projectsEdit = document.getElementById('edit-projects-container');
  renderEditProjects();
};

const renderEditProjects = () => {
  const projectsEdit = document.getElementById('edit-projects-container');
  projectsEdit.innerHTML = window.portfolioData.projects.map((p, i) => `
    <div class="dashboard-item">
      <span class="remove-item" onclick="removeProject(${i})">×</span>
      <input type="text" value="${p.title}" id="project-title-${i}">
      <textarea id="project-desc-${i}">${p.desc}</textarea>
    </div>
  `).join('');
};

window.updateSkillVal = (i, val) => {
  document.getElementById(`skill-val-${i}`).innerText = val + '%';
};

window.removeProject = (index) => {
  window.portfolioData.projects.splice(index, 1);
  renderEditProjects();
};

document.getElementById('add-project-btn').onclick = () => {
  window.portfolioData.projects.push({ title: 'New Project', desc: 'Description' });
  renderEditProjects();
};

// Generate Update (Clipboard)
if (generateUpdateBtn) {
  generateUpdateBtn.onclick = () => {
    const data = {
      hero: {
        name: document.getElementById('edit-hero-name').value,
        sub: document.getElementById('edit-hero-sub').value
      },
      about: {
        text: document.getElementById('edit-about-text').value,
        highlights: document.getElementById('edit-about-highlights').value.split(',').map(h => h.trim())
      },
      experience: window.portfolioData.experience, // Preserving these for now
      services: window.portfolioData.services,
      projects: window.portfolioData.projects.map((_, i) => ({
        title: document.getElementById(`project-title-${i}`).value,
        desc: document.getElementById(`project-desc-${i}`).value
      })),
      skills: window.portfolioData.skills.map((_, i) => ({
        name: document.getElementById(`skill-name-${i}`).value,
        level: parseInt(document.getElementById(`skill-level-${i}`).value)
      })),
      stats: window.portfolioData.stats.map((_, i) => ({
        number: document.getElementById(`stat-num-${i}`).value,
        label: document.getElementById(`stat-label-${i}`).value
      }))
    };

    const scriptContent = `const portfolioData = ${JSON.stringify(data, null, 2)};\n\nwindow.portfolioData = portfolioData;`;
    navigator.clipboard.writeText(scriptContent);
    
    const originalText = generateUpdateBtn.innerText;
    generateUpdateBtn.innerText = 'COPIED TO CLIPS!';
    setTimeout(() => {
      generateUpdateBtn.innerText = originalText;
      alert('SUCCESS: New data copied to clipboard. Paste it into data.js on GitHub to make the changes permanent.');
      window.portfolioData = data;
      renderContent();
    }, 1500);
  };
}

closeOverlayBtns.forEach(btn => {
  btn.onclick = () => {
    toggleOverlay(discordOverlay, false);
    toggleOverlay(contactOverlay, false);
    toggleOverlay(adminLoginOverlay, false);
    toggleOverlay(adminDashboard, false);
  };
});

// Close overlay on background click
window.onclick = (e) => {
  if (e.target === discordOverlay) toggleOverlay(discordOverlay, false);
  if (e.target === contactOverlay) toggleOverlay(contactOverlay, false);
  if (e.target === adminLoginOverlay) toggleOverlay(adminLoginOverlay, false);
  if (e.target === adminDashboard) toggleOverlay(adminDashboard, false);
};

// Initial render
window.onload = renderContent;

// Copy Discord Username logic
if (copyDiscordBtn) {
  copyDiscordBtn.onclick = () => {
    navigator.clipboard.writeText('Thijssssie_official');
    const originalText = copyDiscordBtn.innerText;
    copyDiscordBtn.innerText = 'COPIED!';
    copyDiscordBtn.classList.add('primary');
    setTimeout(() => {
      copyDiscordBtn.innerText = originalText;
    }, 2000);
  };
}
