import type { Metadata } from "next";
import Link from "next/link";

const LEGAL_TITLE = "Правовая информация | Сел — сдал";
const LEGAL_DESCRIPTION =
  "Правовая информация об услугах частных уроков вождения, оплате, конфиденциальности и ограничении гарантий.";

export const metadata: Metadata = {
  title: "Правовая информация",
  description: LEGAL_DESCRIPTION,
  alternates: {
    canonical: "/legal",
  },
  openGraph: {
    title: LEGAL_TITLE,
    description: LEGAL_DESCRIPTION,
    type: "website",
    url: "/legal",
    siteName: "Сел — сдал",
    locale: "ru_RU",
    images: [
      {
        url: "/images/gallery/gallery-2.PNG",
        width: 1448,
        height: 1086,
        alt: "Учебные автомобили инструкторов «Сел — сдал»",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: LEGAL_TITLE,
    description: LEGAL_DESCRIPTION,
    images: ["/images/gallery/gallery-2.PNG"],
  },
};

const legalSections = [
  {
    title: "Исполнители",
    content: [
      "Сайт представляет частные занятия по вождению от инструкторов Сергей и Виктория.",
      "Сергей проводит занятия на автомобиле Lada Vesta NG. Виктория проводит занятия на автомобиле Лада Веста GFL.",
      "Дополнительные сведения об исполнителе, расписании и условиях занятия уточняются при записи.",
    ],
  },
  {
    title: "Описание услуг",
    content: [
      "Услуги включают индивидуальные практические занятия по вождению автомобиля категории B на МКПП.",
      "Занятия могут включать городское вождение, парковку, манёвры, разбор ошибок и подготовку к экзаменационным ситуациям.",
      "Доступная длительность занятия: 1 час и 1,5 часа.",
    ],
  },
  {
    title: "Стоимость",
    content: [
      "Стоимость зависит от выбранной длительности занятия, инструктора, расписания и индивидуальных условий записи.",
      "Актуальная цена подтверждается до начала занятия в переписке с выбранным инструктором.",
    ],
  },
  {
    title: "Оплата",
    content: [
      "Оплата на сайте не принимается.",
      "Способ, срок и порядок оплаты согласуются напрямую с инструктором до занятия.",
      "Сайт не обрабатывает данные банковских карт и не подключён к платёжным системам.",
    ],
  },
  {
    title: "Ограничение гарантий",
    content: [
      "Слоган «Сел — сдал» является рекламным названием сайта и не является гарантией успешной сдачи экзамена.",
      "Результат экзамена зависит от подготовки ученика, дорожной ситуации, требований экзамена и решений экзаменационной комиссии.",
    ],
  },
  {
    title: "Авторские права",
    content: [
      "Тексты, оформление, изображения и материалы сайта предназначены для использования в рамках этого сайта.",
      "Логотипы, названия сервисов, отзывы и картографические материалы принадлежат их правообладателям и используются как информационные материалы или ссылки на внешние источники.",
    ],
  },
  {
    title: "Конфиденциальность",
    content: [
      "На сайте нет регистрации.",
      "На сайте нет оплаты.",
      "На сайте нет форм для ввода имени, телефона, электронной почты или других персональных данных.",
      "Коммуникация начинается только после того, как пользователь самостоятельно открывает Telegram или WhatsApp и добровольно пишет инструктору.",
    ],
  },
];

export default function LegalPage() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#F0F0F0] px-5 py-12 text-black sm:px-8 sm:py-16 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center justify-center rounded-full px-4 text-sm font-semibold text-[#084038] transition hover:text-black focus:outline-none focus:ring-2 focus:ring-[#084038] focus:ring-offset-2"
        >
          На главную
        </Link>

        <header className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#084038]">
            Документы
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-[#084038] sm:text-5xl">
            Правовая информация
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-black/64 sm:text-lg">
            Краткая информация об услугах, оплате, ограничениях и обработке
            данных на сайте.
          </p>
        </header>

        <div className="mt-10 grid gap-5">
          {legalSections.map((section) => (
            <section
              key={section.title}
              className="rounded-[2rem] border border-[#084038]/10 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] sm:p-8"
            >
              <h2 className="text-2xl font-semibold text-[#084038]">
                {section.title}
              </h2>
              <div className="mt-4 grid gap-3 text-base leading-7 text-black/68">
                {section.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
