import { pddSections } from "@/data/pddSections";

export default function PddSection() {
  return (
    <section
      id="pdd"
      aria-labelledby="pdd-heading"
      className="section-reveal w-full bg-[#F0F0F0] px-5 py-20 text-black sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#084038]">
            Справочник
          </p>
          <h2
            id="pdd-heading"
            className="mt-3 text-4xl font-semibold leading-tight text-[#084038] sm:text-5xl"
          >
            Правила дорожного движения РФ
          </h2>
          <p className="mt-4 text-lg leading-8 text-black/68">
            Основные разделы действующих Правил дорожного движения Российской
            Федерации для подготовки к занятиям и экзамену.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pddSections.map((section, index) => (
            <article
              key={section.slug}
              className="group flex min-h-full flex-col rounded-[1.75rem] border border-[#084038]/10 bg-white p-6 shadow-[0_16px_45px_rgba(0,0,0,0.055)] transition duration-300 hover:-translate-y-1 hover:border-[#084038]/20 hover:shadow-[0_22px_60px_rgba(8,64,56,0.1)] motion-reduce:transform-none motion-reduce:transition-none"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#084038] text-xs font-bold tracking-[0.08em] text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="rounded-full bg-[#e8f0eb] px-3 py-1.5 text-right text-xs font-semibold leading-4 text-[#084038]">
                  {section.reference}
                </span>
              </div>

              <h3 className="mt-6 text-xl font-semibold leading-7 text-[#084038]">
                {section.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-black/66">
                {section.description}
              </p>

              <button
                type="button"
                disabled
                aria-disabled="true"
                data-future-route={section.href}
                className="mt-auto inline-flex min-h-11 w-fit cursor-not-allowed items-center rounded-full border border-[#084038]/15 px-5 pt-0.5 text-sm font-semibold text-[#084038]/60"
              >
                Изучить
              </button>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-[1.75rem] border border-[#084038]/10 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <button
            type="button"
            disabled
            aria-disabled="true"
            data-future-route="/pdd"
            className="inline-flex min-h-13 cursor-not-allowed items-center justify-center rounded-full bg-[#084038] px-7 text-sm font-bold text-white opacity-75 sm:shrink-0"
          >
            Открыть справочник ПДД
          </button>
          <p className="text-sm leading-6 text-black/60 sm:max-w-2xl">
            Материалы носят справочный характер. Перед применением необходимо
            сверяться с актуальной официальной редакцией ПДД РФ.
          </p>
        </div>
      </div>
    </section>
  );
}
