import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

const TWO_GIS_LOCATION_URL =
  "https://2gis.ru/nabchelny/geo/4082443724259332";
const LOCATION_MAP_SRC = "/images/location/location-map.jpg";

export default function LocationSection() {
  const hasLocationMap = hasPublicImage(LOCATION_MAP_SRC);

  return (
    <section
      aria-labelledby="location-heading"
      className="w-full max-w-full overflow-x-hidden bg-[#F0F0F0] px-5 py-20 text-black sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#084038]">
            Локация
          </p>
          <h2
            id="location-heading"
            className="mt-3 text-4xl font-semibold leading-tight text-[#084038] sm:text-5xl"
          >
            Где встречаемся
          </h2>
          <p className="mt-4 text-lg leading-8 text-black/68">
            Место встречи и парковка учебных автомобилей. Посмотрите ориентир на
            карте и откройте точку в 2ГИС, чтобы построить маршрут.
          </p>
        </div>

        <div className="grid gap-6 rounded-[2rem] border border-[#084038]/10 bg-white p-5 shadow-[0_24px_70px_rgba(0,0,0,0.08)] sm:p-7 lg:grid-cols-[minmax(280px,0.82fr)_minmax(0,1.18fr)] lg:items-center">
          <div className="p-1 sm:p-3">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#084038]">
              Точка встречи для занятий по вождению
            </p>
            <h3 className="text-2xl font-semibold text-black">
              Парковка ТЦ Омега
            </h3>
            <p className="mt-4 text-base leading-7 text-black/68">
              Здесь ученики встречаются с инструктором перед занятием. Откройте
              2ГИС, чтобы построить маршрут и заранее посмотреть место
              парковки.
            </p>
            <a
              href={TWO_GIS_LOCATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#084038] px-6 text-sm font-bold !text-white transition visited:!text-white hover:bg-[#06342e] hover:!text-white focus:!text-white focus:outline-none focus:ring-2 focus:ring-[#084038] focus:ring-offset-2 active:!text-white sm:w-auto"
            >
              Открыть в 2ГИС
            </a>
          </div>

          <div className="overflow-hidden rounded-[1.5rem] border border-[#084038]/10 bg-[#F0F0F0] p-3 shadow-[0_18px_50px_rgba(0,0,0,0.07)]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.1rem] bg-[#F0F0F0]">
              {hasLocationMap ? (
                <Image
                  src={LOCATION_MAP_SRC}
                  alt="Скриншот карты с местом встречи на парковке ТЦ Омега"
                  fill
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full min-h-64 items-center justify-center px-6 text-center">
                  <p className="text-lg font-semibold text-[#084038]">
                    Скриншот карты скоро появится
                  </p>
                </div>
              )}
            </div>
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
