import { useEffect, useState } from 'react';
import { CYCLE, GROUPS } from '../data';

const PHONE = '+375 44 718-57-40';
const TEL = 'tel:+375447185740';

export default function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (calm.matches) return;
    const t = window.setInterval(() => setI((p) => (p + 1) % CYCLE.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero__grid">
          <div>
            <div className="hero__plate micro">Алексеев Вячеслав Сергеевич · Минская обл., Слуцк</div>
            <h1>Мелкие дела по дому — один выезд</h1>
            <p className="lead hero__lead" style={{ marginTop: 18 }}>
              <span className="micro" style={{ display: 'block', marginBottom: 6 }}>обычно в списке</span>
              <span className="cycler" aria-live="off">
                {CYCLE.map((c, k) => (
                  <span key={c} className={k === i ? 'on' : ''} aria-hidden={k !== i}>{c}</span>
                ))}
              </span>
            </p>
            <p className="body-s" style={{ marginTop: 16 }}>
              Сантехника, электрика, мелкий ремонт и сборка мебели. Один мастер, свой инструмент и
              один счёт за весь список, а не за каждую мелочь отдельно.
            </p>
            <div className="hero__cta">
              <a className="btn" href={TEL}>{PHONE}</a>
              <a className="link-wine" href="#ukazatel">Найти свою поломку</a>
            </div>
            <p className="hero__hint">Слуцк и район. Позвоните — скажу по цене и времени до выезда.</p>
          </div>

          <div>
            <div className="verbs">
              {GROUPS.map((g) => (
                <a key={g.id} href={`#${g.id}`}>
                  <b>{g.verb}</b>
                  <span>{g.cat}</span>
                </a>
              ))}
            </div>
            <p className="verbs__cap">
              Указатель собран из фраз, с которыми звонят. Найдите свою — и не нужно ничего
              формулировать по-умному.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
