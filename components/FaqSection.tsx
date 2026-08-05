"use client";

import {
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const faqItems = [
  {
    id: "companions",
    question:
      "Можно ли приходить на занятие с другом, подругой, супругом или родственником?",
    answer:
      "Нет. В целях безопасности во время занятия в автомобиле находятся только ученик и инструктор.",
  },
  {
    id: "restore-skills",
    question:
      "Можно ли восстановить навыки вождения, если водительское удостоверение уже есть?",
    answer:
      "Да. Сергей проводит занятия для водителей, которые хотят восстановить навыки и вернуть уверенность за рулём.",
  },
  {
    id: "own-car",
    question: "Можно ли заниматься на собственном автомобиле?",
    answer:
      "Возможность занятий на собственном автомобиле необходимо заранее согласовать с Сергеем.",
  },
  {
    id: "both-instructors",
    question: "Можно ли параллельно заниматься у Сергея и Виктории?",
    answer:
      "Да. Можно совмещать занятия у обоих инструкторов, согласовав расписание заранее.",
  },
  {
    id: "discounts",
    question: "Есть ли скидки?",
    answer:
      "Да. При единовременной оплате 10 и более занятий предоставляется скидка 15%.",
  },
  {
    id: "missed-lesson",
    question: "Что будет, если ученик не придёт на занятие?",
    answer:
      "Если ученик не пришёл и своевременно не предупредил инструктора, оплачивается 50% стоимости занятия в качестве компенсации за простой.",
  },
  {
    id: "choose-instructor",
    question: "Можно ли самостоятельно выбрать инструктора?",
    answer:
      "Да. При записи можно выбрать Викторию или Сергея с учётом их свободного расписания.",
  },
  {
    id: "cars",
    question: "На каких автомобилях проходят занятия?",
    answer:
      "Занятия проходят на автомобилях Lada Vesta с механической коробкой передач.",
  },
  {
    id: "exam-preparation",
    question: "Проводится ли подготовка к практическому экзамену?",
    answer:
      "Да. На занятиях разбираются экзаменационные маршруты, перекрёстки, парковка, развороты, перестроения и типичные ошибки кандидатов.",
  },
] as const satisfies readonly FaqItem[];

export default function FaqSection() {
  const [openItemId, setOpenItemId] = useState<string | null>(faqItems[0].id);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function toggleItem(itemId: string) {
    setOpenItemId((currentId) => (currentId === itemId ? null : itemId));
  }

  function handleKeyDown(
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number,
    itemId: string,
  ) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleItem(itemId);
      return;
    }

    let nextIndex: number | null = null;

    if (event.key === "ArrowDown") {
      nextIndex = (index + 1) % faqItems.length;
    } else if (event.key === "ArrowUp") {
      nextIndex = (index - 1 + faqItems.length) % faqItems.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = faqItems.length - 1;
    }

    if (nextIndex === null) return;

    event.preventDefault();
    buttonRefs.current[nextIndex]?.focus();
  }

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="section-reveal w-full bg-[#F0F0F0] px-5 py-20 text-black sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-4xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#084038]">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="mt-3 text-4xl font-semibold leading-tight text-[#084038] sm:text-5xl"
          >
            Часто задаваемые вопросы
          </h2>
        </div>

        <div className="mt-10 grid gap-3">
          {faqItems.map((item, index) => {
            const isOpen = openItemId === item.id;
            const questionId = `faq-question-${item.id}`;
            const answerId = `faq-answer-${item.id}`;

            return (
              <article
                key={item.id}
                className="overflow-hidden rounded-[1.5rem] border border-[#084038]/10 bg-white shadow-[0_12px_35px_rgba(0,0,0,0.045)]"
              >
                <h3>
                  <button
                    ref={(element) => {
                      buttonRefs.current[index] = element;
                    }}
                    id={questionId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => toggleItem(item.id)}
                    onKeyDown={(event) => handleKeyDown(event, index, item.id)}
                    className="flex min-h-16 w-full items-center justify-between gap-5 px-5 py-5 text-left text-base font-semibold leading-6 text-[#084038] transition hover:bg-[#f7f9f7] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#084038] sm:px-6 sm:text-lg"
                  >
                    <span>{item.question}</span>
                    <span
                      aria-hidden="true"
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e8f0eb] text-xl font-light text-[#084038] transition duration-300 motion-reduce:transition-none ${
                        isOpen ? "rotate-45" : "rotate-0"
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>

                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  aria-hidden={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-[#084038]/8 px-5 py-5 text-base leading-7 text-black/68 sm:px-6 sm:py-6">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
