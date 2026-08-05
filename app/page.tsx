import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import ScrollCarSection from "@/components/ScrollCarSection";
import ReviewsSection from "@/components/ReviewsSection";
import LocationSection from "@/components/LocationSection";
import GallerySection from "@/components/GallerySection";
import PricingSection from "@/components/PricingSection";
import ExamRoutesSection from "@/components/ExamRoutesSection";
import PddSection from "@/components/PddSection";
import FaqSection from "@/components/FaqSection";

const HERO_SUBTITLE_IMAGE_SRC = "/images/ui/yveren.png?v=6";
const LOGO_IMAGE_SRC = "/images/logotip.png";
const SITE_URL = "https://www.selsdal.ru";

const drivingSchoolSchema = {
  "@context": "https://schema.org",
  "@type": "DrivingSchool",
  "@id": `${SITE_URL}/#driving-school`,
  name: "Сел — сдал",
  url: SITE_URL,
  image: `${SITE_URL}/images/gallery/gallery-2.PNG`,
  description:
    "Индивидуальные уроки вождения на МКПП и подготовка к экзамену на категорию B в Набережных Челнах.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Набережные Челны",
    addressRegion: "Республика Татарстан",
    addressCountry: "RU",
  },
  areaServed: {
    "@type": "City",
    name: "Набережные Челны",
  },
  employee: [
    {
      "@type": "Person",
      name: "Сергей",
      jobTitle: "Инструктор по вождению",
    },
    {
      "@type": "Person",
      name: "Виктория",
      jobTitle: "Инструктор по вождению",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Уроки вождения",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Индивидуальные занятия по вождению на МКПП",
          serviceType: "Обучение вождению и подготовка к экзамену категории B",
          areaServed: "Набережные Челны",
        },
      },
    ],
  },
  sameAs: ["https://2gis.ru/nabchelny/geo/4082443724259332"],
};

export default function Home() {
  const hasHeroSubtitleImage = hasPublicImage(HERO_SUBTITLE_IMAGE_SRC);

  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#F0F0F0] text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(drivingSchoolSchema).replace(/</g, "\\u003c"),
        }}
      />
      <section
        id="home"
        className="flex min-h-[60svh] items-center justify-center bg-[#F0F0F0] px-5 py-20 text-center sm:min-h-[68svh] sm:px-8 lg:min-h-[70svh] lg:px-12"
      >
        <div className="mx-auto max-w-5xl">
          <h1 className="sr-only">Сел — сдал</h1>
          <div className="relative mx-auto aspect-[5/4] w-[min(88vw,470px)] overflow-hidden">
            <Image
              src={LOGO_IMAGE_SRC}
              alt=""
              aria-hidden="true"
              fill
              priority
              sizes="(min-width: 640px) 470px, 88vw"
              className="scale-110 object-cover"
            />
          </div>
          <div className="mt-7 flex justify-center">
            {hasHeroSubtitleImage ? (
              <Image
                src={HERO_SUBTITLE_IMAGE_SRC}
                alt="Уверенно идем на экзамен"
                width={1337}
                height={328}
                priority
                unoptimized
                className="mx-auto h-auto w-[78.2vw] max-w-[765px] object-contain"
              />
            ) : (
              <p className="text-[clamp(1.5rem,4vw,2.25rem)] font-light leading-tight text-[#084038]">
                Уверенно идем на экзамен
              </p>
            )}
          </div>
        </div>
      </section>

      <ScrollCarSection />
      <PricingSection />
      <ExamRoutesSection />
      <PddSection />
      <FaqSection />
      <ReviewsSection />
      <LocationSection />
      <GallerySection />
      <footer className="w-full bg-[#F0F0F0] px-5 pb-8 pt-2 text-center text-sm text-black/56 sm:px-8 lg:px-12">
        <Link
          href="/legal"
          className="inline-flex min-h-11 items-center justify-center rounded-full px-4 font-semibold text-[#084038] transition hover:text-black focus:outline-none focus:ring-2 focus:ring-[#084038] focus:ring-offset-2"
        >
          Правовая информация
        </Link>
        <p className="mt-2 text-base font-medium text-black/70">
          г. Набережные Челны
        </p>
      </footer>
    </main>
  );
}

function hasPublicImage(src: string) {
  const publicSrc = src.split("?", 1)[0];
  const normalizedSrc = publicSrc.startsWith("/") ? publicSrc.slice(1) : publicSrc;
  const imagePath = path.join(process.cwd(), "public", normalizedSrc);

  return fs.existsSync(imagePath);
}
