const page = document.body.dataset.page;
const links = [['home','Home','index.html'],['menu','Menu','menu.html'],['order','Order','order.html'],['contact','Contact','contact.html']];
document.querySelector('#header').innerHTML = `<div class="nav-wrap"><a class="logo" href="index.html" aria-label="Treat Credit home"><img src="images/logo.png" alt="Treat Credit" width="83" height="83"></a><nav aria-label="Main navigation">${links.map(([key,label,url])=>`<a href="${url}" ${key===page?'aria-current="page"':''}>${label}</a>`).join('')}</nav></div>`;
document.querySelector('#footer').innerHTML = `<div class="footer-wrap"><a class="footer-brand" href="index.html">Treat Credit<span class="pink">.</span></a><small>© ${new Date().getFullYear()} Treat Credit · Billingham</small><nav aria-label="Footer navigation">${links.map(([,label,url])=>`<a href="${url}">${label}</a>`).join('')}</nav></div>`;
const hours = [['Monday','Closed'],['Tuesday','Closed'],['Wednesday','4:30 pm – 12:00 am'],['Thursday','4:30 pm – 12:00 am'],['Friday','4:30 pm – 1:00 am'],['Saturday','4:30 pm – 1:00 am'],['Sunday','4:30 pm – 12:00 am']];
document.querySelectorAll('[data-hours]').forEach(el=>el.innerHTML=`<dl>${hours.map(([day,time])=>`<div><dt>${day}</dt><dd>${time}</dd></div>`).join('')}</dl>`);
if(page==='menu'){
  let active=0;
  function render(index, scroll=false){
    active=(index+MENU.length)%MENU.length;
    const sheet=MENU[active];
    document.querySelector('#sheet-label').textContent=`MENU ${active+1} OF ${MENU.length}`;
    document.querySelector('#menu-content').innerHTML=sheet.sections.map(section=>`<section class="note"><h2>${section.title}</h2>${section.note?`<p class="note-description">${section.note}</p>`:''}${section.items.map(([name,price,description])=>`<article class="menu-item"><div class="item-heading"><h3>${name}</h3>${price?`<span class="price-leader" aria-hidden="true"></span><span class="price">${price}</span>`:''}</div>${description?`<p>${description}</p>`:''}</article>`).join('')}</section>`).join('');
    history.replaceState(null,'',`#menu-${active+1}`);
    if(scroll)document.querySelector('.sheet-controls').scrollIntoView({block:'start'});
  }
  document.querySelector('#prev').onclick=()=>render(active-1);
  document.querySelector('#next').onclick=()=>render(active+1);
  document.querySelector('#next-bottom').onclick=()=>render(active+1,true);
  function renderFromHash(){
    const initial=Number(location.hash.replace('#menu-',''));
    render(Number.isInteger(initial)&&initial>=1&&initial<=MENU.length?initial-1:0);
  }
  window.addEventListener('hashchange',renderFromHash);
  renderFromHash();
}

if(page==='home'){
  const treats=[
    ['Ferrero Rocher cookie tray','images/Ferrero Rocher cookie tray.png'],
    ['Kanafa & strawberry brownie tray','images/Kanafa & strawberry brownie tray.png'],
    ['Kanafa milkshake','images/Kanafa milkshake.png'],
    ['Kanafa strawberry pot','images/Kanafa strawberry pot.png'],
    ['Canned Kinder Matilda cake','images/Canned kinder Matilda cake.png']
  ];
  const photo=document.querySelector('#best-treat-image');
  const caption=document.querySelector('#best-treat-name');
  let active=0;
  let timer;
  let ready=false;
  function start(){
    clearInterval(timer);
    if(!ready||document.hidden)return;
    timer=setInterval(()=>{
      active=(active+1)%treats.length;
      const [name,src]=treats[active];
      photo.src=src;
      photo.alt=name;
      caption.textContent=name;
    },3000);
  }
  document.addEventListener('visibilitychange',start);
  Promise.allSettled(treats.map(([,src])=>{
    const preload=new Image();
    preload.src=src;
    return preload.decode();
  })).then(()=>{ready=true;start();});
}
