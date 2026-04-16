// ==========================
// SAFE DOM INITIALIZATION
// ==========================
document.addEventListener("DOMContentLoaded", () => {

  // ==========================
  // SIDEBAR ELEMENTS
  // ==========================
  const sidebar = document.getElementById("sidebar");
  const openBtn = document.getElementById("openSidebar");
  const closeBtn = document.getElementById("closeSidebar");

  // Safety check (voorkomt "null is not an object" crash)
  if (!sidebar || !openBtn || !closeBtn) {
    console.warn("Sidebar elements not found. Check HTML IDs.");
    return;
  }

  // ==========================
  // OPEN SIDEBAR
  // ==========================
  openBtn.addEventListener("click", () => {
    sidebar.classList.add("active");
  });

  // ==========================
  // CLOSE SIDEBAR
  // ==========================
  closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("active");
  });

  // ==========================
  // SMOOTH SCROLL NAV LINKS
  // ==========================
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");

      // skip empty/hash links
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        // sluit sidebar na klik (mobile UX)
        sidebar.classList.remove("active");
      }
    });
  });

});
