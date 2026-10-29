import { useEffect, useRef, useState } from 'react';
import { GROUPS } from '../data';

export default function Sheets() {
  const [pin, setPin] = useState(false);
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const cards = useRef<Array<HTMLDivElement | null>>([]);

  const apply = (pos: number) => {
    cards.current.forEach((el, i) => {
      if (!el) return;
      const enter = Math.max(0, Math.min(1, pos - (i - 1)));
      const depth = Math.max(0, Math.min(3, pos - i));
      const y = (1 - enter) * 100 - depth * 3.2;
      const scale = 1 - depth * 0.028;
      el.style.transform = `translate3d(0, ${y}%, 0) scale(${scale.toFixed(4)})`;
      el.style.opacity = enter > 0 ? '1' : '0';
      el.style.zIndex = String(10 + i);
    });
  };

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 980px)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!desktop.matches || calm.matches) return;

    let killed = false;
    let cleanup: (() => void) | null = null;
    let timer: number | undefined;

    const begin = () =>
      Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ default: gsap }, { ScrollTrigger }]) => {
        if (killed || !stageRef.current) return;
        gsap.registerPlugin(ScrollTrigger);
        setPin(true);

        requestAnimationFrame(() => requestAnimationFrame(() => {
          const stage = stageRef.current;
          if (killed || !stage) return;
          const trigger = ScrollTrigger.create({
            trigger: stage,
            start: 'top top',
            end: () => '+=' + Math.round(window.innerHeight * 2.2),
            pin: true,
            scrub: 0.4,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const pos = self.progress * (GROUPS.length - 1);
              apply(pos);
              const i = Math.min(GROUPS.length - 1, Math.max(0, Math.round(pos)));
              setActive((prev) => (prev === i ? prev : i));
            },
          });
          ScrollTrigger.refresh();
          cleanup = () => trigger.kill();
        }));
      });

    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        timer = window.setTimeout(begin, 80);
      }
    }, { rootMargin: '320px 0px' });
    if (stageRef.current) io.observe(stageRef.current);

    return () => {
      killed = true;
      io.disconnect();
      if (timer) clearTimeout(timer);
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <section className={`section sheets ${pin ? 'sheets--pin' : 'sheets--manual'}`} id="listy">
      <div className="wrap sheets__head">
        <div className="cols shead">
          <div className="shead__num micro">03 / работы</div>
          <h2 className="shead__title reveal">Четыре листа с одного стола</h2>
          <p className="shead__note reveal">
            Что конкретно входит в каждую группу и что нужно от вас. Прокрутите: листы ложатся один
            на другой.
          </p>
        </div>
      </div>

      <div className="sheets__stage" ref={stageRef}>
        <div className="wrap sheets__inner">
          <div className="deck">
            {GROUPS.map((g, i) => (
              <article
                className="sheet"
                key={g.id}
                ref={(el) => { cards.current[i] = el as HTMLDivElement | null; }}
                style={i === 0 && !pin ? { position: 'relative', inset: 'auto' } : undefined}
                aria-hidden={pin && i !== active ? true : undefined}
              >
                <div className="sheet__top">
                  <span className="sheet__n num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{g.verb}</h3>
                  <span className="sheet__cat">{g.cat}</span>
                </div>
                <ul className="sheet__list">
                  {g.works.map((w) => <li key={w}><span>{w}</span></li>)}
                </ul>
                <p className="sheet__ask"><b>От вас:</b> {g.ask}</p>
              </article>
            ))}
          </div>

          <div className="deck__aside" aria-hidden="true">
            <div className="deck__big num">
              {String(active + 1).padStart(2, '0')}<small> / 04</small>
            </div>
            <p className="deck__cap">
              {GROUPS[active].cat}
            </p>
            <p className="deck__cap">
              Лист ложится сверху: так же копятся дела, если не собрать их в один список.
            </p>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="sheets__rail">
          {GROUPS.map((g, i) => (
            <button key={g.id} type="button" className={i === active ? 'on' : ''} aria-pressed={i === active}>
              {g.verb}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
