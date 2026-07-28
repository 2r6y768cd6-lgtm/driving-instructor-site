import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

// Чтобы добавить новое фото, положите файл в public/images/gallery
// и добавьте его в этот массив.
const galleryImages: GalleryImage[] = [
  {
    id: "gallery-1",
    src: "/images/gallery/gallery-1.jpg",
    alt: "Фото с занятия по вождению",
  },
  {
    id: "gallery-2",
    src: "/images/gallery/gallery-2.jpg",
    alt: "Учебный автомобиль на занятии",
  },
  {
    id: "gallery-3",
    src: "/images/gallery/gallery-3.jpg",
    alt: "Фото учебного автомобиля",
  },
  {
    id: "gallery-4",
    src: "/images/gallery/gallery-4.jpg",
    alt: "Фото с занятия по вождению",
  },
  {
    id: "gallery-5",
    src: "/images/gallery/gallery-5.jpg",
    alt: "Учебный автомобиль на площадке",
  },
  {
    id: "gallery-6",
    src: "/images/gallery/gallery-6.jpg",
    alt: "Фото рабочего момента на занятии",
  },
];

export default function GallerySection() {
  const availableImages = galleryImages.filter((image) =>
    hasPublicImage(image.src),
  );

  return (
    <section
      aria-labelledby="gallery-heading"
      className="w-full max-w-full overflow-x-hidden bg-[#F0F0F0] px-5 py-20 text-black sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#21C45A]">
            Галерея
          </p>
          <h2
            id="gallery-heading"
            className="mt-3 text-4xl font-semibold leading-tight text-[#084038] sm:text-5xl"
          >
            Фото с занятий
          </h2>
          <p className="mt-4 text-lg leading-8 text-black/68">
            Здесь будут появляться фотографии с занятий, учебных автомобилей и
            рабочих моментов.
          </p>
        </div>

        {availableImages.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {availableImages.map((image) => (
              <figure
                key={image.id}
                className="overflow-hidden rounded-[1.5rem] border border-[#084038]/10 bg-white p-3 shadow-[0_18px_50px_rgba(0,0,0,0.07)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.1rem] bg-[#F0F0F0]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 motion-safe:hover:scale-[1.03]"
                  />
                </div>
              </figure>
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-[#084038]/20 bg-white px-6 py-16 text-center shadow-[0_18px_50px_rgba(0,0,0,0.05)]">
            <p className="text-xl font-semibold text-[#084038]">
              Фотографии скоро появятся
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function hasPublicImage(src: string) {
  const normalizedSrc = src.startsWith("/") ? src.slice(1) : src;
  const imagePath = path.join(process.cwd(), "public", normalizedSrc);

  return fs.existsSync(imagePath);
}
