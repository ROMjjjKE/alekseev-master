import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
const errs = [];
p.on('pageerror', e => errs.push(e.message));
p.on('console', m => { if (m.type() === 'error') errs.push('c:' + m.text().slice(0, 120)); });
await p.setViewport({ width: 1440, height: 900 });
await p.evaluateOnNewDocument(() => {
  window.__s = [];
  new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__s.push(+e.value.toFixed(4)); }).observe({ type: 'layout-shift', buffered: true });
});
await p.goto('http://127.0.0.1:4260/alekseev-master/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 900));
console.log(JSON.stringify(await p.evaluate(() => {
  const c = document.createElement('canvas').getContext('2d');
  const s = 'Мелкие дела по дому — один выезд и сантехника с электрикой';
  const w = f => { c.font = f; return +c.measureText(s).width.toFixed(1); };
  return {
    play: w('700 40px Play'), arial: w('400 40px Arial'), arial700: w('700 40px Arial'),
    mul: w('400 40px Mulish'),
    rPlay700: +(w('700 40px Play') / w('700 40px Arial')).toFixed(4),
    rPlay400: +(w('400 40px Play') / w('400 40px Arial')).toFixed(4),
    rMul: +(w('400 40px Mulish') / w('400 40px Arial')).toFixed(4),
    h1: document.querySelector('h1').innerText, cls: +window.__s.reduce((a, b) => a + b, 0).toFixed(4),
    fonts: [...document.fonts].filter(f => f.status === 'loaded').length,
  };
}), null, 1), errs.slice(0, 3));
await b.close();
