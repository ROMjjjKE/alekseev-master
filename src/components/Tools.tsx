const TOOLS = [
  ['Перфоратор', 'буры под бетон, газобетон и кирпич'],
  ['Шуруповёрт', 'биты, саморезы, дюбели на все стены'],
  ['Уровень и рулетка', 'чтобы полка висела ровно, а не «на глаз»'],
  ['Ключи и шестигранники', 'смесители, сифоны, бачки, мебельная фурнитура'],
  ['Силикон, лента, прокладки', 'расходники свои: отвечаю за то, что ставлю'],
  ['Пылесос и тряпки', 'убираю за собой стружку и капли'],
];

export default function Tools() {
  return (
    <section className="section" id="instrument">
      <div className="wrap">
        <div className="cols shead">
          <div className="shead__num micro">04 / инструмент</div>
          <h2 className="shead__title reveal">Приезжаю со своим</h2>
          <p className="shead__note reveal">
            Не нужно искать дрель у соседа и ехать за крепежом: всё, чем работаю, вожу с собой.
          </p>
        </div>
        <div className="tools reveal">
          {TOOLS.map(([b, s]) => (
            <div className="tools__item" key={b}>
              <b>{b}</b>
              <span>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
