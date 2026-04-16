const sidebar = document.getElementById("sidebar");
const openBtn = document.getElementById("openSidebar");
const closeBtn = document.getElementById("closeSidebar");

openBtn.onclick = () => sidebar.classList.add("active");
closeBtn.onclick = () => sidebar.classList.remove("active");

document.addEventListener("click", (e) => {
  if (sidebar.classList.contains("active") &&
      !sidebar.contains(e.target) &&
      e.target !== openBtn) {
    sidebar.classList.remove("active");
  }
});

/* SKILL ANIMATION */
window.addEventListener("load", () => {
  document.querySelectorAll(".fill").forEach(bar => {
    bar.style.width = bar.dataset.width + "%";
  });
});
