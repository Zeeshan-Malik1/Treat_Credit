const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'chrome'});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844}});
  await page.clock.install();
  await page.goto('http://localhost:3000');
  await page.locator('#weekly').scrollIntoViewIfNeeded();
  await page.evaluate(()=>Promise.all([...document.images].map(img=>img.decode().catch(()=>{}))));
  await page.waitForTimeout(1000);
  const names=['Ferrero Rocher cookie tray','Kanafa & strawberry brownie tray','Kanafa milkshake','Kanafa strawberry pot','Canned Kinder Matilda cake'];
  for(const name of [...names,names[0]]){
   assert.equal(await page.locator('#best-treat-name').textContent(),name);
   assert.equal(await page.locator('#best-treat-image').getAttribute('alt'),name);
   assert(await page.locator('#best-treat-image').evaluate(img=>img.complete&&img.naturalWidth>0));
   await page.clock.fastForward(1950);
  }
  assert.equal(await page.locator('.treat-pause').count(),0);
  await page.locator('#weekly').screenshot({path:'tests/best-treats-mobile.png'});
  console.log('Passed: all five photos and captions, 1.95-second rotation, wraparound, and no pause button.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
