
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  if(menuBtn && navLinks){
    menuBtn.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn.setAttribute("aria-expanded","false");
    }));
  }

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(!reduced && "IntersectionObserver" in window){
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if(e.isIntersecting){ e.target.classList.add("visible"); obs.unobserve(e.target); }
      });
    }, {threshold:.14});
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));

    const seq = [...document.querySelectorAll(".reveal-seq")];
    const seqObs = new IntersectionObserver(entries => {
      if(entries.some(e => e.isIntersecting)){
        seq.forEach((el,i) => setTimeout(() => el.classList.add("visible"), i*110));
        seqObs.disconnect();
      }
    }, {threshold:.12});
    if(seq[0]) seqObs.observe(seq[0]);
  } else {
    document.querySelectorAll(".reveal,.reveal-seq").forEach(el => el.classList.add("visible"));
  }

  document.querySelectorAll(".mailto-form").forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const data = new FormData(form);
      let lines = [];
      let subject = form.dataset.subjectPrefix || "[Actyrom]";
      for(const [key,val] of data.entries()){
        if(key === "Objet" && String(val).trim()) subject += " " + String(val).trim();
        lines.push(`${key} : ${val}`);
      }
      const mail = `mailto:contact@actyrom.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
      window.location.href = mail;
    });
  });

  const filters = document.querySelectorAll(".filter-btn");
  const products = document.querySelectorAll(".product");
  filters.forEach(btn => btn.addEventListener("click", () => {
    filters.forEach(x => x.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    products.forEach(p => p.classList.toggle("hide", f !== "all" && p.dataset.category !== f));
  }));

  const cartPanel = document.getElementById("cartPanel");
  if(cartPanel){
    const count = document.getElementById("cartCount");
    const itemsBox = document.getElementById("cartItems");
    const backdrop = document.getElementById("cartBackdrop");
    const openBtn = document.getElementById("cartOpen");
    const closeBtn = document.getElementById("cartClose");
    const clearBtn = document.getElementById("cartClear");
    const mailBtn = document.getElementById("cartMail");
    let cart = JSON.parse(localStorage.getItem("actyromCart") || "[]");

    const save = () => localStorage.setItem("actyromCart", JSON.stringify(cart));
    const render = () => {
      count.textContent = cart.length;
      if(!cart.length){
        itemsBox.innerHTML = '<div class="cart-empty">Votre sélection est vide.</div>';
        mailBtn.href = "contact.html";
      } else {
        itemsBox.innerHTML = cart.map((x,i) => `<div class="cart-item"><span>${x}</span><button type="button" data-remove="${i}">Retirer</button></div>`).join("");
        const body = "Bonjour,\n\nJe souhaite des informations concernant :\n- " + cart.join("\n- ") + "\n\nMerci.";
        mailBtn.href = `mailto:contact@actyrom.fr?subject=${encodeURIComponent("[Boutique Actyrom] Demande d'informations")}&body=${encodeURIComponent(body)}`;
      }
      itemsBox.querySelectorAll("[data-remove]").forEach(b => b.addEventListener("click", () => {
        cart.splice(Number(b.dataset.remove),1); save(); render();
      }));
    };
    const setOpen = v => {
      cartPanel.classList.toggle("open",v); backdrop.classList.toggle("open",v);
      cartPanel.setAttribute("aria-hidden", v ? "false" : "true");
      openBtn?.setAttribute("aria-expanded", v ? "true" : "false");
      if(v) closeBtn?.focus();
    };
    document.querySelectorAll(".add-btn").forEach(btn => btn.addEventListener("click", () => {
      const item = btn.dataset.item;
      if(!cart.includes(item)) cart.push(item);
      save(); render(); setOpen(true);
    }));
    openBtn?.addEventListener("click", () => setOpen(true));
    closeBtn?.addEventListener("click", () => setOpen(false));
    backdrop?.addEventListener("click", () => setOpen(false));
    clearBtn?.addEventListener("click", () => { cart=[]; save(); render(); });
    render();
  }
});


// ACTYROM_A11Y_V4
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  document.addEventListener("keydown", e => {
    if(e.key !== "Escape") return;

    if(navLinks?.classList.contains("open")){
      navLinks.classList.remove("open");
      menuBtn?.setAttribute("aria-expanded","false");
      menuBtn?.focus();
    }

    const cartPanel = document.getElementById("cartPanel");
    const backdrop = document.getElementById("cartBackdrop");
    const cartOpen = document.getElementById("cartOpen");

    if(cartPanel?.classList.contains("open")){
      cartPanel.classList.remove("open");
      backdrop?.classList.remove("open");
      cartPanel.setAttribute("aria-hidden","true");
      cartOpen?.setAttribute("aria-expanded","false");
      cartOpen?.focus();
    }
  });

  const filterButtons = document.querySelectorAll(".filter-btn");
  const syncFilters = () => filterButtons.forEach(btn =>
    btn.setAttribute("aria-pressed", btn.classList.contains("active") ? "true" : "false")
  );
  filterButtons.forEach(btn => btn.addEventListener("click", syncFilters));
  syncFilters();
});
