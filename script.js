document.addEventListener("DOMContentLoaded", () => {

  const sidebar = document.getElementById("sidebar");
  const openBtn = document.getElementById("openSidebar");
  const closeBtn = document.getElementById("closeSidebar");

  if (!sidebar || !openBtn || !closeBtn) return;

  let isOpen = false;

  function openSidebar(){
    sidebar.classList.add("active");
    isOpen = true;
  }

  function closeSidebar(){
    sidebar.classList.remove("active");
    isOpen = false;
  }

  // OPEN
  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    openSidebar();
  });

  // CLOSE BUTTON
  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeSidebar();
  });

  // CLICK OUTSIDE CLOSE (ROBUST)
  document.addEventListener("click", (e) => {
    if (!isOpen) return;

    const clickedInsideSidebar = sidebar.contains(e.target);
    const clickedButton = openBtn.contains(e.target);

    if (!clickedInsideSidebar && !clickedButton) {
      closeSidebar();
    }
  });

  // STOP SIDEBAR CLICK PROPAGATION
  sidebar.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // SMOOTH SCROLL (SAFE)
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {

      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
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
