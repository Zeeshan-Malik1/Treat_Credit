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
    document.querySelector('#menu-content').innerHTML=sheet.sections.map(section=>`<section class="note"><h2>${section.title}</h2>${section.note?`<p class="note-description">${section.note}${section.upgrade?`<span class="note-upgrade">${section.upgrade}</span>`:''}</p>`:''}${section.items.map(([name,price,description])=>`<article class="menu-item"><div class="item-heading"><h3>${name}</h3>${price?`<span class="price-leader" aria-hidden="true"></span><span class="price">${price}</span>`:''}</div>${description?`<p>${description}</p>`:''}</article>`).join('')}</section>`).join('');
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
    ['Kanafa milkshake','images/kanafa-milkshake-matching.png'],
    ['Kanafa strawberry pot','images/kanafa-strawberry-pot-matching.png'],
    ['Canned Kinder Matilda cake','images/kinder-matilda-matching.png'],
    ['Passion Fruit Red Bull Glitter Mocktail','images/passion-fruit-mocktail.png'],
    ['Cherry Red Bull Glitter Mocktail','images/cherry-mocktail.png'],
    ['Kinder Bueno Iced Latte','images/kinder-bueno-latte.png'],
    ['Vanilla Iced Matcha','images/vanilla-matcha.png'],
    ['Ferrero Rocher Milkshake','images/ferrero-rocher-milkshake.png']
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
    },1950);
  }
  document.addEventListener('visibilitychange',start);
  Promise.allSettled(treats.map(([,src])=>{
    const preload=new Image();
    preload.src=src;
    return preload.decode();
  })).then(()=>{ready=true;start();});
}

// Show the arrival note once per tab, including direct menu visits.
let welcomeSeen=false;
try { welcomeSeen=sessionStorage.getItem('treat-credit-welcome')==='seen'; } catch {}
if(!welcomeSeen){
  const welcome=document.createElement('dialog');
  welcome.className='queue-welcome';
  welcome.setAttribute('aria-labelledby','queue-title');
  welcome.setAttribute('aria-describedby','queue-description');
  welcome.innerHTML=`<button class="queue-close" type="button" aria-label="Close welcome">&times;</button><span class="queue-sticker" aria-hidden="true">a little wait,<br>a lot of lovely</span><div class="queue-art" aria-hidden="true"><span>&#10022;</span><img src="images/car.gif" alt=""><span>&#9825;</span></div><span class="eyebrow">HEY, SWEET THING</span><h2 id="queue-title">Queue up to<br>be served <span>&#9825;</span></h2><p id="queue-description">Pull up, stay cosy in your car and join the queue alongside the cones. We&#8217;ll be with you for something sweet!</p><a class="button" href="menu.html">Peek at the menu</a><button class="queue-dismiss text-link" type="button">Got it, sweet!</button><span class="queue-signoff handwritten">Good things come to those who queue.</span>`;
  document.body.append(welcome);
  const previousFocus=document.activeElement;
  const markSeen=()=>{try { sessionStorage.setItem('treat-credit-welcome','seen'); } catch {}};
  welcome.querySelector('.queue-close').onclick=()=>welcome.close();
  welcome.querySelector('.queue-dismiss').onclick=()=>welcome.close();
  welcome.querySelector('a').onclick=markSeen;
  welcome.addEventListener('close',()=>{
    markSeen();
    document.documentElement.classList.remove('welcome-open');
    if(previousFocus instanceof HTMLElement)previousFocus.focus();
  });
  welcome.showModal();
  document.documentElement.classList.add('welcome-open');
}
