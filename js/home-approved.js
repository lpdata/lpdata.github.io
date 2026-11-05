/* Approved Home design: translated text is real HTML; fixed quote from approved mockup. */
document.addEventListener('DOMContentLoaded',()=>{
const home=document.getElementById('inicio');if(!home)return;
const quote=home.querySelector('.home-quote [data-pt][data-en]');
const buttons=[...home.querySelectorAll('[data-home-lang]')];
const copy=[...home.querySelectorAll('[data-pt][data-en]')];
function changeHome(lang){lang=lang==='en'?'en':'pt';for(const node of copy){node.innerHTML=node.getAttribute('data-'+lang)}buttons.forEach(btn=>{const isActive=btn.dataset.homeLang===lang;btn.classList.toggle('active',isActive);btn.setAttribute('aria-pressed',String(isActive))});try{localStorage.setItem('portfolio-home-language',lang)}catch(e){}}
let lang='pt';try{lang=localStorage.getItem('portfolio-home-language')||'pt'}catch(e){}
changeHome(lang);buttons.forEach(btn=>btn.addEventListener('click',()=>changeHome(btn.dataset.homeLang)));
});