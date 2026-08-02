import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";

type ReviewScreenshot = {
  id: string;
  image: string;
  alt: string;
  width: number;
  height: number;
};

const reviewScreenshots: ReviewScreenshot[] = [
  {
    id: "review-1",
    image: "/images/reviews/review-1.jpg",
    alt: "Скриншот отзыва ученика об обучении вождению",
    width: 1290,
    height: 636,
  },
  {
    id: "review-2",
    image: "/images/reviews/review-2.jpg",
    alt: "Скриншот отзыва об уроках вождения",
    width: 1289,
    height: 698,
  },
  {
    id: "review-3",
    image: "/images/reviews/review-3.jpg",
    alt: "Скриншот отзыва с внешней площадки",
    width: 1289,
    height: 572,
  },
  {
    id: "review-4",
    image: "/images/reviews/review-4.jpg",
    alt: "Скриншот отзыва ученика",
    width: 1289,
    height: 582,
  },
  {
    id: "review-5",
    image: "/images/reviews/review-5.jpg",
    alt: "Скриншот отзыва ученика об уроках вождения",
    width: 1117,
    height: 720,
  },
  {
    id: "review-6",
    image: "/images/reviews/review-6.jpg",
    alt: "Скриншот отзыва об обучении вождению",
    width: 1116,
    height: 866,
  },
  {
    id: "review-7",
    image: "/images/reviews/review-7.jpg",
    alt: "Скриншот отзыва ученика с внешней площадки",
    width: 1107,
    height: 976,
  },
  {
    id: "review-8",
    image: "/images/reviews/review-8.jpg",
    alt: "Скриншот отзыва об уроках вождения на МКПП",
    width: 1110,
    height: 613,
  },
];

const victoriaAvitoReviewsUrl =
  "https://m.avito.ru/brands/03f2bca8b65fc7909e068d565019096e/all?src=sharing&sellerId=00db80240fee5fd2608a30b21eed8639#open-reviews-list";

const sergeyAvitoReviewsUrl =
  "https://www.avito.ru/naberezhnye_chelny/predlozheniya_uslug/instruktor_po_vozhdeniyu_avtoinstruktor_lada_mkpp_7949770465?context=H4sIAAAAAAAA_wE_AMD_YToyOntzOjEzOiJsb2NhbFByaW9yaXR5IjtiOjA7czoxOiJ4IjtzOjE2OiJPWGFTdUs4MDBHTXpOMWtFIjt9q2qnYD8AAAA#open-reviews-list";

function publicImageExists(imagePath: string) {
  return existsSync(path.join(process.cwd(), "public", imagePath));
}

function ReviewScreenshotCard({ review }: { review: ReviewScreenshot }) {
  const hasImage = publicImageExists(review.image);

  return (
    <article className="rounded-[1.75rem] border border-[#084038]/10 bg-white p-3 shadow-[0_18px_60px_rgba(0,0,0,0.07)] sm:p-4">
      <div className="relative flex min-h-[220px] items-center justify-center overflow-hidden rounded-[1.35rem] bg-[#050505] sm:aspect-[2/1]">
        {hasImage ? (
          <Image
            src={review.image}
            alt={review.alt}
            width={review.width}
            height={review.height}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="h-auto w-full object-contain"
          />
        ) : (
          <div className="px-6 py-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#21C45A]">
              Скриншот
            </p>
            <p className="mt-3 text-lg font-semibold text-[#084038]">
              Файл будет добавлен позже
            </p>
            <p className="mt-2 text-sm leading-6 text-black/58">
              Добавьте изображение в {review.image}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}

export default function ReviewsSection() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="w-full max-w-full overflow-x-hidden bg-[#F0F0F0] px-5 pb-24 pt-4 text-black sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#084038]">
            Отзывы
          </p>
          <h2
            id="reviews-title"
            className="mt-4 text-4xl font-semibold leading-tight text-[#084038] sm:text-5xl"
          >
            Отзывы учеников
          </h2>
          <p className="mt-5 text-base leading-7 text-black/64 sm:text-lg">
            Реальные отзывы учеников с внешней площадки.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {reviewScreenshots.map((review) => (
            <ReviewScreenshotCard key={review.id} review={review} />
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-[#084038]/10 bg-white p-6 shadow-[0_20px_70px_rgba(0,0,0,0.06)] sm:p-8">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-semibold text-[#084038]">
              Оригиналы отзывов
            </h3>
            <p className="mt-3 text-base leading-7 text-black/64">
              Посмотреть все отзывы можно на внешней площадке.
            </p>
          </div>

          <div className="mt-6 flex flex-col items-center gap-4">
            <a
              href={victoriaAvitoReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#084038] px-6 text-center text-sm font-bold !text-white transition visited:!text-white hover:bg-[#06342e] hover:!text-white focus:!text-white focus:outline-none focus:ring-2 focus:ring-[#084038] focus:ring-offset-2 active:!text-white sm:w-[300px]"
            >
              Смотреть отзывы Виктории
            </a>
            <a
              href={sergeyAvitoReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#084038] px-6 text-center text-sm font-bold !text-white transition visited:!text-white hover:bg-[#06342e] hover:!text-white focus:!text-white focus:outline-none focus:ring-2 focus:ring-[#084038] focus:ring-offset-2 active:!text-white sm:w-[300px]"
            >
              Смотреть отзывы Сергея
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
