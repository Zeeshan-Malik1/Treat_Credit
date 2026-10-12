const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'chrome'});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:3000');
  await page.getByRole('button',{name:'Got it, sweet!'}).click();
  const track=page.locator('#review-cards');
  assert.equal(await page.locator('.review-card').count(),19);
  assert.equal(new Set(await page.locator('.review-card figcaption strong').allTextContents()).size,19);
  await track.scrollIntoViewIfNeeded();
  await page.mouse.move(0,0);
  await page.waitForFunction(()=>document.querySelector('#review-cards').scrollLeft>100,{},{timeout:5000});
  await page.getByRole('button',{name:'Pause reviews',exact:true}).click();
  await page.waitForTimeout(1000);
  const stopped=await track.evaluate(e=>e.scrollLeft);
  await page.waitForTimeout(7000);
  assert.equal(await track.evaluate(e=>e.scrollLeft),stopped,'Pause stops automatic movement');
  await page.emulateMedia({reducedMotion:'reduce'});
  assert.equal(await page.getByRole('button',{name:'Play reviews',exact:true}).count(),1);
  for(const [width,height] of [[320,568],[390,844],[768,1024],[1440,900]]){
   await page.setViewportSize({width,height});
   await track.evaluate(e=>e.scrollTo({left:0,behavior:'instant'}));
   await page.getByRole('button',{name:'Previous reviews',exact:true}).click();
   assert(await track.evaluate(e=>Math.abs(e.scrollWidth-e.clientWidth-e.scrollLeft)<3),'Previous wraps to the last review');
   const last=await page.locator('.review-card').last().boundingBox();
   const viewport=await track.boundingBox();
   assert(last.x>=viewport.x-1&&last.x+last.width<=viewport.x+viewport.width+1,'Last review visible');
   await page.getByRole('button',{name:'Next reviews',exact:true}).click();
   assert.equal(await track.evaluate(e=>e.scrollLeft),0,'Next wraps to first review');
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No page overflow');
   assert.equal(await track.evaluate(e=>getComputedStyle(e).scrollbarWidth),'none','Scrollbar hidden');
   assert(await page.locator('.review-card').evaluateAll(cards=>cards.every(card=>Math.round(card.getBoundingClientRect().height)===320)),'All review cards stay compact');
   await page.locator('.reviews').screenshot({path:`tests/all-reviews-${width}.png`});
  }
  const original=await page.locator('.review-card blockquote').first().innerText();
  await page.getByRole('button',{name:'Read full review by MaisieGraceee',exact:true}).click();
  assert.equal(await page.locator('.full-review-text').textContent(),original,'Full review text preserved');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.full-review[open]').count(),0);
  assert.deepEqual(errors,[]);
  console.log('Passed: 19 reviews, 3-second autoplay, compact cards, hidden scrollbar, full review reading, pause, reduced motion and navigation at four sizes.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
