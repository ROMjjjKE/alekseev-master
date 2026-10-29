const STEPS = [
  ['Звонок', 'Расскажите, что случилось. Спрошу про стену, воду и щит — чтобы привезти нужное и не ездить дважды.'],
  ['Цена', 'По телефону называю вилку, на месте — точную сумму. Если всё не так, как вы описали, скажу до начала работы.'],
  ['Работа', 'Делаю по списку, а не одну позицию из пяти: за один выезд закрываю и кран, и карниз, и розетку.'],
  ['Уборка', 'Убираю мусор и пыль, показываю, что получилось. Оплата после работы.'],
];

export default function Visit() {
  return (
    <section className="section" id="visit">
      <div className="wrap">
        <div className="cols shead">
          <div className="shead__num micro">05 / визит</div>
          <h2 className="shead__title reveal">Как проходит вызов</h2>
          <p className="shead__note reveal">
            Четыре шага. Никаких «приеду и посмотрю, а там решим» — цена до работы, оплата после.
          </p>
        </div>
        <div className="visit" style={{ marginTop: 'clamp(18px, 2.4vw, 30px)' }}>
          <p className="body-s reveal">
            Мелкие дела удобнее собирать в один список: пока еду, время и выезд делятся на всё, что
            вы перечислили. Поэтому и говорю — пишите всё, даже мелочь вроде «крючок в ванной».
          </p>
          <ul className="visit__list reveal">
            {STEPS.map(([t, d], i) => (
              <li key={t}>
                <b>{String(i + 1).padStart(2, '0')}</b>
                <div>
                  <strong>{t}</strong>
                  <span>{d}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
