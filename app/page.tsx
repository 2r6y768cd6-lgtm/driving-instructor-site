import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import ScrollCarSection from "@/components/ScrollCarSection";
import ReviewsSection from "@/components/ReviewsSection";
import LocationSection from "@/components/LocationSection";
import GallerySection from "@/components/GallerySection";

const LEARNER_SIGN_SRC = "/images/ui/learner-u.png";

export default function Home() {
  const hasLearnerSign = hasPublicImage(LEARNER_SIGN_SRC);

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
          <p
            className="mt-6 inline-flex items-center justify-center gap-1.5 text-[clamp(1.5rem,4vw,2.25rem)] font-light leading-tight text-[#084038] sm:gap-2"
            aria-label="Уверенно идем на экзамен"
          >
            {hasLearnerSign ? (
              <>
                <span
                  className="inline-flex w-[56px] shrink-0 items-center justify-center sm:w-[68px] md:w-[84px] lg:w-[100px]"
                  aria-hidden="true"
                >
                  <Image
                    src={LEARNER_SIGN_SRC}
                    alt=""
                    width={2363}
                    height={2110}
                    priority
                    className="h-auto w-full object-contain"
                  />
                </span>
                <span className="translate-y-[0.18em]">
                  веренно идем на экзамен
                </span>
              </>
            ) : (
              "Уверенно идем на экзамен"
            )}
          </p>
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
