
document.addEventListener("DOMContentLoaded", function(){
  const menuButton = document.getElementById("menuButton");
  const navLinks = document.getElementById("navLinks");
  if(menuButton && navLinks){
    menuButton.addEventListener("click", function(){
      const opened = navLinks.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", opened ? "true" : "false");
    });
    document.querySelectorAll(".nav-links a").forEach(function(link){
      link.addEventListener("click", function(){
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded","false");
      });
    });
  }

  const form = document.getElementById("contact-form");
  if(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const profile = document.getElementById("profile").value;
      const service = document.getElementById("service").value;
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();
      const mailSubject = encodeURIComponent("[Actyrom.fr] " + (subject || service || "Demande de contact"));
      const body = encodeURIComponent(
`Nom / entreprise : ${name}
E-mail : ${email}
Profil : ${profile}
Besoin : ${service}

Message :
${message}`
      );
      window.location.href = `mailto:contact@actyrom.fr?subject=${mailSubject}&body=${body}`;
    });
  }
});
