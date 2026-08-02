import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import ScrollCarSection from "@/components/ScrollCarSection";
import ReviewsSection from "@/components/ReviewsSection";
import LocationSection from "@/components/LocationSection";
import GallerySection from "@/components/GallerySection";

const HERO_SUBTITLE_IMAGE_SRC = "/images/ui/yveren.png?v=6";

export default function Home() {
  const hasHeroSubtitleImage = hasPublicImage(HERO_SUBTITLE_IMAGE_SRC);

  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#F0F0F0] text-black">
      <section
        id="home"
        className="flex min-h-[60svh] items-center justify-center bg-[#F0F0F0] px-5 py-20 text-center sm:min-h-[68svh] sm:px-8 lg:min-h-[70svh] lg:px-12"
      >
        <div className="mx-auto max-w-5xl">
          <h1 className="text-[clamp(4rem,12vw,6rem)] font-bold leading-[0.92] tracking-normal text-black">
            Сел - сдал
          </h1>
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
