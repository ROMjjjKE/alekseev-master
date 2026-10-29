import { useState } from 'react';

const WHEN = ['Сегодня, если можно', 'На этой неделе', 'Не срочно', 'Просто спросить'];
const PHONE = '+375 44 718-57-40';
const TEL = 'tel:+375447185740';

export default function Ask() {
  const [f, setF] = useState({ name: '', tel: '', city: 'Слуцк', when: WHEN[1], note: '' });
  const [bad, setBad] = useState<Record<string, boolean>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const set = (k: string, v: string) => setF((s) => ({ ...s, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, boolean> = {};
    if (f.name.trim().length < 2) errs.name = true;
    if (f.tel.replace(/\D/g, '').length < 9) errs.tel = true;
    setBad(errs);
    if (Object.keys(errs).length) return;

    setSending(true);
    const lines = [
      'Заявка с сайта: мастер на все руки (Алексеев В. С.)',
      `Имя: ${f.name}`,
      `Телефон: ${f.tel}`,
      `Город / район: ${f.city || '—'}`,
      `Когда: ${f.when}`,
      'Список дел:',
      f.note || '—',
    ].join('\n');

    window.setTimeout(() => {
      window.open(`https://wa.me/375447185740?text=${encodeURIComponent(lines)}`, '_blank', 'noopener');
      setSending(false);
      setSent(true);
    }, 400);
  };

  return (
    <section className="ask" id="zayavka">
      <div className="wrap" style={{ paddingBlock: 'var(--sect)' }}>
        <div className="cols shead" style={{ marginBottom: 'clamp(18px, 3vw, 38px)' }}>
          <div className="shead__num micro">07 / позвать</div>
          <h2 className="shead__title reveal">Список дел — и я приеду</h2>
          <p className="shead__note reveal" style={{ color: 'var(--ink-2)' }}>
            Позвоните или оставьте номер и список: перезвоню, скажу по цене и времени.
          </p>
        </div>

        <div className="ask__grid">
          <div>
            <div className="micro">Телефон</div>
            <a className="ask__phone" href={TEL}>{PHONE}</a>
            <p className="ask__hint">
              Не отвечаю — значит с инструментом у кого-то в ванной. Напишите в WhatsApp, перезвоню.
            </p>
          </div>

          <form className="form" onSubmit={submit} noValidate>
            <div className="half">
              <div className={bad.name ? 'bad' : ''}>
                <label htmlFor="a-name">Имя</label>
                <input id="a-name" value={f.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" aria-invalid={!!bad.name} />
                {bad.name && <span className="err">Как к вам обращаться</span>}
              </div>
              <div className={bad.tel ? 'bad' : ''}>
                <label htmlFor="a-tel">Телефон</label>
                <input id="a-tel" value={f.tel} onChange={(e) => set('tel', e.target.value)} inputMode="tel" autoComplete="tel" aria-invalid={!!bad.tel} />
                {bad.tel && <span className="err">Нужен номер для связи</span>}
              </div>
            </div>

            <div className="half">
              <div>
                <label htmlFor="a-city">Город или адрес</label>
                <input id="a-city" value={f.city} onChange={(e) => set('city', e.target.value)} placeholder="Слуцк, район" />
              </div>
              <div>
                <label htmlFor="a-when">Когда</label>
                <select id="a-when" value={f.when} onChange={(e) => set('when', e.target.value)}>
                  {WHEN.map((w) => <option key={w}>{w}</option>)}
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="a-note">Список дел</label>
              <textarea id="a-note" rows={4} value={f.note} onChange={(e) => set('note', e.target.value)} placeholder={'Например:\n— течёт под мойкой\n— повесить карниз в спальне\n— розетка выпадает на кухне'} />
            </div>

            <button className="btn" type="submit" disabled={sending}>
              {sending ? 'Собираем заявку…' : 'Отправить в WhatsApp'}
            </button>

            {sent && (
              <div className="ask__ok" role="status">
                Заявка собрана и открыта в WhatsApp — осталось нажать «Отправить». Если окно не
                открылось, позвоните: <a href={TEL} style={{ borderBottom: '1px solid currentColor' }}>{PHONE}</a>.
              </div>
            )}

            <p className="ask__fine">
              Чем подробнее список, тем точнее скажу по цене и времени. Даже «крючок в ванной»
              считайте: мелочи дешевле делать за один раз.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
