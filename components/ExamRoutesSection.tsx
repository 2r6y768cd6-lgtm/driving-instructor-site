import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

const ROUTES_IMAGE_SRC = "/images/routes/exam-routes.png";

const routeTopics = [
  "сложные перекрёстки",
  "перестроения",
  "развороты",
  "остановка и парковка",
  "дорожные знаки и разметка",
  "выбор полосы движения",
  "типичные ошибки на экзамене",
] as const;

export default function ExamRoutesSection() {
  const hasRoutesImage = hasPublicImage(ROUTES_IMAGE_SRC);

  return (
    <section
      id="exam-routes"
      aria-labelledby="exam-routes-heading"
      className="section-reveal w-full bg-[#F0F0F0] px-5 py-20 text-black sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#084038]">
            Подготовка к экзамену
          </p>
          <h2
            id="exam-routes-heading"
            className="mt-3 text-4xl font-semibold leading-tight text-[#084038] sm:text-5xl"
          >
            Экзаменационные маршруты ГАИ в Набережных Челнах
          </h2>
          <p className="mt-4 text-lg leading-8 text-black/68">
            На занятиях разбираем участки города и дорожные ситуации, которые
            могут встретиться на практическом экзамене.
          </p>
        </div>

        <div className="mt-10 grid gap-6 rounded-[2rem] border border-[#084038]/10 bg-white p-5 shadow-[0_22px_65px_rgba(0,0,0,0.07)] sm:p-7 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-stretch">
          <div className="relative min-h-72 overflow-hidden rounded-[1.5rem] bg-[#e5ebe7] sm:min-h-96">
            {hasRoutesImage ? (
              <Image
                src={ROUTES_IMAGE_SRC}
                alt="Карта экзаменационных маршрутов ГАИ в Набережных Челнах"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden px-6 text-center">
                <div
                  aria-hidden="true"
                  className="absolute -right-16 -top-20 size-64 rounded-full border-[3rem] border-white/35"
                />
                <div
                  aria-hidden="true"
                  className="absolute -bottom-24 -left-20 size-72 rounded-full border-[3rem] border-[#084038]/5"
                />
                <div className="relative">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#084038] text-white shadow-lg">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="size-7"
                      aria-hidden="true"
                    >
                      <path d="M9 18 3.8 20.6A.55.55 0 0 1 3 20.1V6.7a1 1 0 0 1 .55-.9L9 3m0 15 6 3m-6-3V3m6 18 5.45-2.8a1 1 0 0 0 .55-.9V3.9a.55.55 0 0 0-.8-.5L15 6m0 15V6M9 3l6 3" />
                    </svg>
                  </div>
                  <p className="mt-5 text-xl font-semibold text-[#084038] sm:text-2xl">
                    Подробная карта маршрутов готовится
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center p-1 sm:p-3">
            <ul className="grid gap-3 text-base text-black/72">
              {routeTopics.map((topic) => (
                <li
                  key={topic}
                  className="flex items-center gap-3 rounded-2xl bg-[#F0F0F0] px-4 py-3"
                >
                  <span
                    aria-hidden="true"
                    className="size-2 shrink-0 rounded-full bg-[#21c45a]"
                  />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function hasPublicImage(src: string) {
  const normalizedSrc = src.startsWith("/") ? src.slice(1) : src;
  const imagePath = path.join(process.cwd(), "public", normalizedSrc);

  return fs.existsSync(imagePath);
}
