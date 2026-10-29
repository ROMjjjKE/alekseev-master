import { GROUPS } from '../data';

export default function Index() {
  return (
    <section className="section" id="ukazatel">
      <div className="wrap">
        <div className="cols shead">
          <div className="shead__num micro">02 / указатель</div>
          <h2 className="shead__title reveal">Так и говорите, как есть</h2>
          <p className="shead__note reveal">
            Тридцать две фразы, с которыми звонят чаще всего. Сгруппированы по глаголу: течёт, не
            работает, висит криво, не собрано.
          </p>
        </div>

        <div className="index">
          {GROUPS.map((g) => (
            <div className="grp reveal" id={g.id} key={g.id}>
              <div className="grp__head">
                <b>{g.verb}</b>
                <em>{g.cat}</em>
              </div>
              <ul>
                {g.phrases.map((p, i) => (
                  <li key={p}>
                    <i>{String(i + 1).padStart(2, '0')}</i>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="body-s" style={{ marginTop: 22 }}>
          Нет вашей фразы — не страшно: если это мужская работа по дому, скорее всего, я её делаю.
          Скажите своими словами.
        </p>
      </div>
    </section>
  );
}
