/* ThriveWell static export — page navigation */
var PAGES = [{"id":"home","file":"index.html","label":"Home"},{"id":"stories","file":"stories.html","label":"Lives Changed"},{"id":"share","file":"share.html","label":"Share your story"},{"id":"programs","file":"programs.html","label":"Programs"},{"id":"patients","file":"patients.html","label":"Patient Assistance"},{"id":"assistance","file":"assistance.html","label":"Patient Assistance"},{"id":"wellness","file":"wellness.html","label":"Wellness — Diva & Dude"},{"id":"register","file":"register.html","label":"Join"},{"id":"donate","file":"donate.html","label":"Give & Get Involved"},{"id":"ira","file":"ira.html","label":"IRA giving"},{"id":"impact","file":"impact.html","label":"About Us"},{"id":"research","file":"research.html","label":"Research"},{"id":"resources","file":"resources.html","label":"Resources"},{"id":"events","file":"events.html","label":"Events"},{"id":"board","file":"board.html","label":"Our Board"},{"id":"team","file":"team.html","label":"Our Team"},{"id":"ytac","file":"ytac.html","label":"YTAC"},{"id":"contact","file":"contact.html","label":"Contact"},{"id":"financials","file":"financials.html","label":"Financials"},{"id":"news","file":"news.html","label":"News & Newsletters"},{"id":"e_luncheon","file":"e_luncheon.html","label":"Conquering Cancer in Every Color"},{"id":"e_bras","file":"e_bras.html","label":"Bras For A Cause"},{"id":"e_telethon","file":"e_telethon.html","label":"Healing Hearts Telethon"},{"id":"e_golf","file":"e_golf.html","label":"Iron Strong Golf Tournament"},{"id":"e_ppp","file":"e_ppp.html","label":"Paint the Parkway Pink 5K"},{"id":"e_pedaling","file":"e_pedaling.html","label":"Pedaling in Pink"},{"id":"e_wiml","file":"e_wiml.html","label":"Women in Medicine & Law Pink Party"},{"id":"e_fishing","file":"e_fishing.html","label":"YTAC Invitational Fishing Tournament"},{"id":"e_movember","file":"e_movember.html","label":"YTAC Movember Madness"},{"id":"e_foods","file":"e_foods.html","label":"Foods That Heal"},{"id":"e_giveloc","file":"e_giveloc.html","label":"Discover Foods That Heal at PharmTable"},{"id":"e_luncheon2026","file":"e_luncheon2026.html","label":"Pink Party: Fun, Food, & Fellowship"},{"id":"e_ytacfish","file":"e_ytacfish.html","label":"Run or Walk the 14th Annual Paint the Parkway Pink Fun Run"},{"id":"e_ironstrong2026","file":"e_ironstrong2026.html","label":"2026 Iron Strong Golf Tournament and Dinner"},{"id":"e_pedalpink","file":"e_pedalpink.html","label":"Pedal in Pink San Antonio"},{"id":"story_sarcoma","file":"story_sarcoma.html","label":"Carmen Hawkins"},{"id":"story_uterine","file":"story_uterine.html","label":"Roxanne Toscano"},{"id":"story_debra","file":"story_debra.html","label":"Debra"},{"id":"story_lynn","file":"story_lynn.html","label":"Lynn Stahl"},{"id":"story_dude","file":"story_dude.html","label":"A ThriveWell Dude"},{"id":"story_assurance","file":"story_assurance.html","label":"A ThriveWell Survivor"},{"id":"story_mark","file":"story_mark.html","label":"Mark"},{"id":"story_claudia","file":"story_claudia.html","label":"Claudia Martinez"}];
var SEARCHABLE = [{"id":"home","label":"Home"},{"id":"stories","label":"Lives Changed"},{"id":"share","label":"Share your story"},{"id":"programs","label":"Programs"},{"id":"patients","label":"Patient Assistance"},{"id":"wellness","label":"Wellness — Diva & Dude"},{"id":"register","label":"Join"},{"id":"donate","label":"Give & Get Involved"},{"id":"ira","label":"IRA giving"},{"id":"impact","label":"About Us"},{"id":"research","label":"Research"},{"id":"resources","label":"Resources"},{"id":"events","label":"Events"},{"id":"board","label":"Our Board"},{"id":"team","label":"Our Team"},{"id":"ytac","label":"YTAC"},{"id":"contact","label":"Contact"},{"id":"financials","label":"Financials"},{"id":"news","label":"News & Newsletters"}];
var REDIRECT = {sharestory:['share'],whatwedo:['impact'],fundraise:['donate','fundraise'],sponsor:['donate','sponsor']};
function fileFor(id){ for(var i=0;i<PAGES.length;i++){ if(PAGES[i].id===id) return PAGES[i].file; } return null; }
function go(id,anchor){
  if(REDIRECT[id]){ anchor=anchor||REDIRECT[id][1]; id=REDIRECT[id][0]; }
  var f=fileFor(id); if(!f){ return; }
  location.href=f+(anchor?'#'+anchor:'');
}
function toggleMenu(e,ix){
  e.stopPropagation();
  var el=document.querySelector('.navitem[data-ix="'+ix+'"]');
  var open=el.classList.contains('open');
  document.querySelectorAll('.navitem.open').forEach(function(n){n.classList.remove('open');});
  if(!open) el.classList.add('open');
}
document.addEventListener('click',function(){
  document.querySelectorAll('.navitem.open').forEach(function(n){n.classList.remove('open');});
  var sb=document.getElementById('searchResults'); if(sb){ sb.style.display='none'; }
});
function runSiteSearch(){
  var inp=document.getElementById('siteSearch'),box=document.getElementById('searchResults');
  if(!inp||!box) return;
  var q=inp.value.trim().toLowerCase();
  if(!q){ box.style.display='none'; box.innerHTML=''; return; }
  var res=SEARCHABLE.filter(function(e){return e.label.toLowerCase().indexOf(q)>=0||e.id.toLowerCase().indexOf(q)>=0;}).slice(0,8);
  box.innerHTML=res.length?res.map(function(e){return '<a class="sr-item" onclick="pickSearch(\''+e.id+'\')">'+e.label+'</a>';}).join(''):'<div class="sr-empty">No matches</div>';
  box.style.display='block';
}
function pickSearch(id){ go(id); }
function animateCounts(){
  var els=document.querySelectorAll('[data-count]');
  if(!els.length) return;
  var fmt=function(el,n){var pre=el.getAttribute('data-prefix')||'',suf=el.getAttribute('data-suffix')||'';return pre+Math.round(n).toLocaleString()+suf;};
  var run=function(el){
    var target=parseFloat(el.getAttribute('data-count'))||0,dur=1500,t0=performance.now();
    var step=function(t){var p=Math.min(1,(t-t0)/dur);var e=1-Math.pow(1-p,3);el.textContent=fmt(el,target*e);if(p<1)requestAnimationFrame(step);};
    requestAnimationFrame(step);
  };
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){ els.forEach(function(el){el.textContent=fmt(el,parseFloat(el.getAttribute('data-count'))||0);}); return; }
  if(!('IntersectionObserver' in window)){ els.forEach(run); return; }
  var io=new IntersectionObserver(function(ents){ents.forEach(function(en){if(en.isIntersecting){run(en.target);io.unobserve(en.target);}});},{threshold:.4});
  els.forEach(function(el){io.observe(el);});
}
document.addEventListener('DOMContentLoaded',animateCounts);
