import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import ScrollCarSection from "@/components/ScrollCarSection";
import ReviewsSection from "@/components/ReviewsSection";
import LocationSection from "@/components/LocationSection";
import GallerySection from "@/components/GallerySection";

const HERO_SUBTITLE_IMAGE_SRC = "/images/ui/nadpissy.JPEG";

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
          <div
            className="mt-7 flex justify-center"
            aria-label="Уверенно идем на экзамен"
          >
            {hasHeroSubtitleImage ? (
              <Image
                src={HERO_SUBTITLE_IMAGE_SRC}
                alt="Уверенно идем на экзамен"
                width={1290}
                height={310}
                priority
                className="h-auto w-full max-w-[min(86vw,760px)] object-contain"
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
    </main>
  );
}

function hasPublicImage(src: string) {
  const normalizedSrc = src.startsWith("/") ? src.slice(1) : src;
  const imagePath = path.join(process.cwd(), "public", normalizedSrc);

  return fs.existsSync(imagePath);
}
