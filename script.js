document.addEventListener("DOMContentLoaded", () => {

  const sidebar = document.getElementById("sidebar");
  const openBtn = document.getElementById("openSidebar");
  const closeBtn = document.getElementById("closeSidebar");

  if (!sidebar || !openBtn || !closeBtn) return;

  let isOpen = false;

  function updateUI() {
    sidebar.classList.toggle("active", isOpen);

    // ☰ button verbergen als sidebar open is
    openBtn.style.opacity = isOpen ? "0" : "1";
    openBtn.style.pointerEvents = isOpen ? "none" : "auto";
  }

  function openSidebar() {
    isOpen = true;
    updateUI();
  }

  function closeSidebar() {
    isOpen = false;
    updateUI();
  }

  function toggleSidebar() {
    isOpen = !isOpen;
    updateUI();
  }

  // OPEN (TOGGLE)
  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSidebar();
  });

  // CLOSE BUTTON
  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeSidebar();
  });

  // CLICK OUTSIDE CLOSE
  document.addEventListener("click", (e) => {
    if (!isOpen) return;

    if (!sidebar.contains(e.target) && e.target !== openBtn) {
      closeSidebar();
    }
  });

  // STOP BUBBLE INSIDE SIDEBAR
  sidebar.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // SMOOTH SCROLL
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {

      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      closeSidebar();
    });
  });

});
