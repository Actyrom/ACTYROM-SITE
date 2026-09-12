
document.addEventListener('DOMContentLoaded',()=>{
 const btn=document.querySelector('.menu-btn'), nav=document.querySelector('.nav-links');
 if(btn&&nav) btn.addEventListener('click',()=>{nav.classList.toggle('open');btn.setAttribute('aria-expanded',nav.classList.contains('open'))});
 const form=document.querySelector('#contact-form');
 if(form) form.addEventListener('submit',e=>{
  e.preventDefault();
  const g=id=>document.querySelector(id).value.trim();
  const subject=encodeURIComponent('[Actyrom.fr] '+(g('#subject')||'Demande de contact'));
  const body=encodeURIComponent(`Nom / entreprise : ${g('#name')}\nE-mail : ${g('#email')}\nProfil : ${document.querySelector('#profile').value}\n\nMessage :\n${g('#message')}`);
  location.href=`mailto:contact@actyrom.fr?subject=${subject}&body=${body}`;
 });
 const copy=document.querySelector('#copy-email');
 if(copy&&navigator.clipboard) copy.addEventListener('click',async()=>{await navigator.clipboard.writeText('contact@actyrom.fr');copy.textContent='Adresse copiée';setTimeout(()=>copy.textContent='Copier l’adresse',1600)});
});
