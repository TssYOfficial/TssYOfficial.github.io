const config = {
  profile: "/images/5A07617F-F01C-4E58-B496-5D517B648E43.png",
  username: "TssY.",
  subtitle: "Discord • Minecraft • Development"
};

document.getElementById("profileImage").src = config.profile;
document.getElementById("username").textContent = config.username;
document.getElementById("subtitle").textContent = config.subtitle;

document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', function(e){
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
