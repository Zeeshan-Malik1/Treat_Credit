const {chromium,webkit}=require('playwright');
const fs=require('fs');
const assert=require('assert/strict');
const chrome=['C:/Program Files/Google/Chrome/Application/chrome.exe','C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',process.env.LOCALAPPDATA+'/Google/Chrome/Application/chrome.exe'].find(p=>fs.existsSync(p));
async function check(browser,label){
 const errors=[];
 const page=await browser.newPage();
 page.on('pageerror',e=>errors.push(e.message));
 for(const [width,height] of [[320,568],[375,667],[390,844],[430,932],[600,960],[768,1024],[820,1180],[1024,768],[1366,768],[1440,900]]){
  await page.setViewportSize({width,height});
  for(const route of ['index.html','menu.html','contact.html','order.html']){
   await page.goto(`http://localhost:3000/${route}`);
   await page.evaluate(()=>document.fonts.ready);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${label} ${route} overflow at ${width}`);
   assert.equal(await page.locator('nav[aria-label="Main navigation"] [aria-current="page"]').count(),1);
   if(route==='index.html'){
    const button=await page.locator('.hero .button').boundingBox();
    assert(button.y+button.height<=height,`Explore menu below fold at ${width}×${height}`);
   }
   if(route==='contact.html'){
    const location=await page.locator('.contact-row').first().boundingBox();
    assert(location.y+location.height<=height,`Contact location below fold at ${width}`);
   }
   if(route==='menu.html'){
    assert.equal(await page.locator('.menu-tab').count(),0);
    const firstItem=await page.locator('.menu-item').first().boundingBox();
    assert(firstItem.y+firstItem.height<=height,`First menu item below fold at ${width}: ${JSON.stringify(firstItem)}`);
    for(let sheet=0;sheet<5;sheet++){
     assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Menu ${sheet+1} overflow ${width}`);
     assert(await page.locator('.menu-item').count()>0);
     assert.equal(await page.locator('#original-menu').count(),0);
     assert.equal(await page.locator('#sheet-label').textContent(),`MENU ${sheet+1} OF 5`);
     if(sheet<4)await page.locator('#next').click();
    }
    await page.locator('#next').click();
    assert.equal(await page.locator('#sheet-label').textContent(),'MENU 1 OF 5');
    await page.locator('#prev').click();
    assert.equal(await page.locator('#sheet-label').textContent(),'MENU 5 OF 5');
   }
   const broken=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src));
   assert.deepEqual(broken,[]);
  }
  console.log(`${label}: ${width}×${height}, all pages and menu sheets passed`);
 }
 await page.setViewportSize({width:1440,height:1000});
 await page.goto('http://localhost:3000');
 await page.locator('img[loading="lazy"]').evaluateAll(imgs=>imgs.forEach(i=>i.loading='eager'));
 await page.evaluate(()=>Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))));
 await page.screenshot({path:`tests/${label}-home-desktop.png`,fullPage:true});
 await page.setViewportSize({width:390,height:844});
 await page.screenshot({path:`tests/${label}-home-mobile.png`,fullPage:true});
 await page.goto('http://localhost:3000/menu.html#menu-5');
 await page.screenshot({path:`tests/${label}-menu-mobile.png`,fullPage:true});
 await page.goto('http://localhost:3000/order.html');
 await page.locator('img').evaluateAll(imgs=>imgs.forEach(i=>i.loading='eager'));
 await page.evaluate(()=>Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))));
 await page.screenshot({path:`tests/${label}-order-mobile.png`,fullPage:true});
 await page.setViewportSize({width:1366,height:900});
 await page.screenshot({path:`tests/${label}-order-desktop.png`,fullPage:true});
 assert.deepEqual(errors,[],'Browser errors');
 await browser.close();
}
(async()=>{
 console.log('Chrome path:',chrome||'bundled Chromium');
 if(!process.argv.includes('--webkit-only')) await check(await chromium.launch(chrome?{executablePath:chrome}:{}),'chrome');
 if(process.argv.includes('--webkit')) await check(await webkit.launch(),'webkit');
 if(process.argv.includes('--open')){
  const {spawn}=require('child_process');
  if(chrome){spawn(chrome,['http://localhost:3000'],{detached:true,stdio:'ignore'}).unref();console.log('Opened website in Google Chrome.');}
 }
})().catch(error=>{console.error(error);process.exit(1);});
