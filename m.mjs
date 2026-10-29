import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await p.goto('http://127.0.0.1:4260/alekseev-master/', { waitUntil: 'networkidle2' });
await p.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 700));
await p.evaluate(() => { const el = document.querySelector('#listy'); window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + 160, behavior: 'instant' }); });
await new Promise(r => setTimeout(r, 700));
console.log(await p.evaluate(() => ({
  cls: document.querySelector('.sheets').className.split(' ').pop(),
  rail: getComputedStyle(document.querySelector('.sheets__rail')).display,
  sheetPos: getComputedStyle(document.querySelector('.sheet')).position,
  sheetH: Math.round(document.querySelector('.sheet').getBoundingClientRect().height),
  sw: document.documentElement.scrollWidth,
  cyc: document.querySelector('.cycler').getBoundingClientRect().width.toFixed(0),
})));
await p.screenshot({ path: 'shots/a-mobile-sheets.png' });
await b.close();
