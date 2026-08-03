"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  className: string;
  imageClassName?: string;
};

// Чтобы добавить новое фото, положите файл в public/images/gallery
// и добавьте его в этот массив.
const galleryImages: GalleryImage[] = [
  {
    id: "gallery-1",
    src: "/images/gallery/gallery-1.jpg",
    alt: "Учебный автомобиль выполняет упражнение на автодроме",
    className: "basis-[74%] sm:basis-[46%] lg:basis-[35%] aspect-[3/4]",
    imageClassName: "object-center",
  },
  {
    id: "gallery-2",
    src: "/images/gallery/gallery-2.PNG",
    alt: "Два учебных автомобиля на площадке",
    className: "basis-[88%] sm:basis-[72%] lg:basis-[62%] aspect-[4/3]",
  },
  {
    id: "gallery-3",
    src: "/images/gallery/gallery-3.JPG",
    alt: "Учебные автомобили перед зданием автошколы",
    className: "basis-[88%] sm:basis-[72%] lg:basis-[62%] aspect-[4/3]",
  },
  {
    id: "gallery-4",
    src: "/images/gallery/gallery-4.PNG",
    alt: "Автомобиль инструктора на вечернем автодроме",
    className: "basis-[88%] sm:basis-[72%] lg:basis-[62%] aspect-[4/3]",
  },
  {
    id: "gallery-5",
    src: "/images/gallery/gallery-5.PNG",
    alt: "Учебный автомобиль на автодроме на закате",
    className: "basis-[88%] sm:basis-[72%] lg:basis-[62%] aspect-[4/3]",
  },
];

export default function GallerySection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const [isDragging, setIsDragging] = useState(false);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    const slider = sliderRef.current;
    if (!slider) return;

    dragState.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: slider.scrollLeft,
    };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!dragState.current.active || !sliderRef.current) return;

    event.preventDefault();
    sliderRef.current.scrollLeft =
      dragState.current.scrollLeft - (event.clientX - dragState.current.startX);
  }

  function stopDragging(event: PointerEvent<HTMLDivElement>) {
    if (!dragState.current.active) return;

    dragState.current.active = false;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function scrollSlider(direction: -1 | 1) {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.scrollBy({
      left: slider.clientWidth * 0.82 * direction,
      behavior: "smooth",
    });
  }

  return (
    <section
      aria-labelledby="gallery-heading"
      className="w-full max-w-full overflow-x-hidden bg-[#F0F0F0] px-5 py-20 text-black sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-end justify-between gap-6 sm:mb-10">
          <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#084038]">
            Галерея
          </p>
          <h2
            id="gallery-heading"
            className="mt-3 text-4xl font-semibold leading-tight text-[#084038] sm:text-5xl"
          >
            Фото с занятий
          </h2>
          <p className="mt-4 text-lg leading-8 text-black/68">
            Наши учебные автомобили и рабочие моменты с автодрома.
          </p>
          </div>

          <div className="hidden shrink-0 gap-2 sm:flex" aria-label="Управление галереей">
            <button
              type="button"
              onClick={() => scrollSlider(-1)}
              className="flex size-12 items-center justify-center rounded-full border border-[#084038]/15 bg-white text-2xl text-[#084038] shadow-sm transition hover:-translate-x-0.5 hover:border-[#084038]/30 focus:outline-none focus:ring-2 focus:ring-[#084038] focus:ring-offset-2"
              aria-label="Предыдущее фото"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={() => scrollSlider(1)}
              className="flex size-12 items-center justify-center rounded-full bg-[#084038] text-2xl text-white shadow-sm transition hover:translate-x-0.5 hover:bg-[#0a5147] focus:outline-none focus:ring-2 focus:ring-[#084038] focus:ring-offset-2"
              aria-label="Следующее фото"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className={`-mx-5 flex snap-x snap-mandatory items-center gap-4 overflow-x-auto px-5 pb-5 sm:-mx-8 sm:gap-5 sm:px-8 lg:mx-0 lg:px-0 ${
            isDragging ? "cursor-grabbing select-none" : "cursor-grab"
          } [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
          onDragStart={(event) => event.preventDefault()}
          aria-label="Фотографии с занятий. Листайте в сторону"
        >
            {galleryImages.map((image, index) => (
              <figure
                key={image.id}
                className={`group relative min-w-0 shrink-0 snap-center overflow-hidden rounded-[1.75rem] border border-white/70 bg-[#dfe5df] shadow-[0_18px_50px_rgba(8,64,56,0.12)] first:snap-start last:snap-end ${image.className}`}
              >
                <div className="relative size-full overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 64vw, (min-width: 640px) 50vw, 100vw"
                    className={`object-cover transition duration-700 ease-out motion-safe:group-hover:scale-[1.025] ${image.imageClassName ?? "object-center"}`}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />
                  <span className="absolute bottom-4 left-4 flex size-9 items-center justify-center rounded-full border border-white/50 bg-black/25 text-xs font-semibold tracking-[0.12em] text-white backdrop-blur-md sm:bottom-5 sm:left-5">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </figure>
            ))}
          </div>
        <p className="mt-2 text-sm font-medium text-[#084038]/60 sm:hidden">
          Проведите пальцем, чтобы посмотреть ещё
        </p>
      </div>
    </section>
  );
}
