type Tariff = {
  id: string;
  title: string;
  features?: readonly string[];
  description?: string;
  price?: string;
  badge?: string;
};

const tariffs: readonly Tariff[] = [
  {
    id: "one-hour",
    title: "Занятие 1 час",
    features: [
      "индивидуальное занятие",
      "автомобиль инструктора",
      "механическая коробка передач",
      "подходит для подготовки к экзамену и отработки отдельных навыков",
    ],
    price: "Стоимость уточняйте у инструктора",
  },
  {
    id: "ninety-minutes",
    title: "Занятие 1,5 часа",
    features: [
      "больше времени на практику",
      "экзаменационные маршруты",
      "перекрёстки, перестроения и парковка",
      "индивидуальная программа занятия",
    ],
    price: "Стоимость уточняйте у инструктора",
  },
  {
    id: "ten-lessons",
    title: "Пакет от 10 занятий",
    description:
      "При единовременной оплате 10 и более занятий предоставляется скидка 15%.",
    badge: "−15%",
  },
];

export default function PricingSection() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="section-reveal w-full bg-[#F0F0F0] px-5 py-20 text-black sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#084038]">
            Форматы
          </p>
          <h2
            id="pricing-heading"
            className="mt-3 text-4xl font-semibold leading-tight text-[#084038] sm:text-5xl"
          >
            Стоимость занятий
          </h2>
          <p className="mt-4 text-lg leading-8 text-black/68">
            Выберите удобную продолжительность занятия. Итоговая стоимость
            зависит от выбранного инструктора и формата обучения.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {tariffs.map((tariff) => (
            <article
              key={tariff.id}
              className="relative flex min-h-full flex-col overflow-hidden rounded-[2rem] border border-[#084038]/10 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(8,64,56,0.11)] motion-reduce:transform-none motion-reduce:transition-none sm:p-8"
            >
              {tariff.badge ? (
                <span className="absolute right-5 top-5 rounded-full bg-[#21c45a] px-3 py-1.5 text-sm font-bold text-[#06342e]">
                  {tariff.badge}
                </span>
              ) : null}

              <h3 className="max-w-[80%] text-2xl font-semibold leading-tight text-[#084038]">
                {tariff.title}
              </h3>

              {tariff.features ? (
                <ul className="mt-7 grid gap-4 text-base leading-6 text-black/70">
                  {tariff.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#084038] text-[0.65rem] font-bold text-white"
                      >
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {tariff.description ? (
                <p className="mt-7 text-base leading-7 text-black/70">
                  {tariff.description}
                </p>
              ) : null}

              {tariff.price ? (
                <p className="mt-auto border-t border-[#084038]/10 pt-7 text-lg font-semibold leading-7 text-[#084038]">
                  {tariff.price}
                </p>
              ) : null}
            </article>
          ))}
        </div>

        <div className="mt-6 flex gap-4 rounded-[1.75rem] bg-[#084038] p-5 text-white shadow-[0_18px_45px_rgba(8,64,56,0.2)] sm:items-center sm:p-6">
          <div
            aria-hidden="true"
            className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/12"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="size-6"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 10.5v5M12 7.5h.01" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-base font-medium leading-7 text-white/92">
            Оплата производится после завершения каждого занятия. При покупке
            пакета условия оплаты согласовываются с инструктором.
          </p>
        </div>
      </div>
    </section>
  );
}
