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
  {
    id: "gallery-6",
    src: "/images/gallery/gallery-6.JPG",
    alt: "Учебный автомобиль на площадке для занятий",
    className: "basis-[88%] sm:basis-[72%] lg:basis-[62%] aspect-[4/3]",
  },
  {
    id: "gallery-7",
    src: "/images/gallery/gallery-7.JPG",
    alt: "Учебный автомобиль между разметочными конусами",
    className: "basis-[88%] sm:basis-[72%] lg:basis-[62%] aspect-[4/3]",
  },
  {
    id: "gallery-8",
    src: "/images/gallery/gallery-8.JPG",
    alt: "Учебный автомобиль выполняет упражнение с конусами",
    className: "basis-[74%] sm:basis-[46%] lg:basis-[35%] aspect-[3/4]",
    imageClassName: "object-right",
  },
];

export default function GallerySection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({
    active: false,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
  });
  const [isDragging, setIsDragging] = useState(false);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    const slider = sliderRef.current;
    if (!slider) return;

    dragState.current = {
      active: true,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
    };
    slider.style.scrollSnapType = "none";
    setIsDragging(true);
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!dragState.current.active || !sliderRef.current) return;

    const now = performance.now();
    const deltaX = event.clientX - dragState.current.lastX;
    const deltaTime = Math.max(now - dragState.current.lastTime, 1);

    event.preventDefault();
    sliderRef.current.scrollLeft -= deltaX;
    dragState.current.velocity = -deltaX / deltaTime;
    dragState.current.lastX = event.clientX;
    dragState.current.lastTime = now;
  }

  function stopDragging(event: PointerEvent<HTMLDivElement>) {
    if (!dragState.current.active) return;

    const slider = sliderRef.current;
    const velocity = dragState.current.velocity;
    dragState.current.active = false;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (slider) {
      const target = getNearestSlidePosition(slider, velocity);
      slider.style.removeProperty("scroll-snap-type");
      slider.scrollTo({ left: target, behavior: "smooth" });
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

          <div
            className="hidden shrink-0 gap-2 sm:flex"
            aria-label="Управление галереей"
          >
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
          className={`-mx-5 flex items-center gap-4 overflow-x-auto px-5 pb-5 [will-change:scroll-position] sm:-mx-8 sm:gap-5 sm:px-8 lg:mx-0 lg:px-0 ${
            isDragging
              ? "cursor-grabbing select-none snap-none"
              : "cursor-grab snap-x snap-proximity"
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
              <div className="pointer-events-none relative size-full overflow-hidden select-none">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  draggable={false}
                  sizes="(min-width: 1024px) 64vw, (min-width: 640px) 50vw, 100vw"
                  className={`pointer-events-none select-none object-cover transition duration-700 ease-out motion-safe:group-hover:scale-[1.025] ${image.imageClassName ?? "object-center"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />
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

function getNearestSlidePosition(slider: HTMLDivElement, velocity: number) {
  const slides = Array.from(
    slider.querySelectorAll<HTMLElement>("figure"),
  );
  const sliderLeft = slider.getBoundingClientRect().left;
  const getSlideCenter = (slide: HTMLElement) =>
    slide.getBoundingClientRect().left -
    sliderLeft +
    slider.scrollLeft +
    slide.offsetWidth / 2;
  const projectedCenter =
    slider.scrollLeft + slider.clientWidth / 2 + velocity * 160;

  const nearestSlide = slides.reduce<HTMLElement | null>((nearest, slide) => {
    if (!nearest) return slide;

    const slideCenter = getSlideCenter(slide);
    const nearestCenter = getSlideCenter(nearest);

    return Math.abs(slideCenter - projectedCenter) <
      Math.abs(nearestCenter - projectedCenter)
      ? slide
      : nearest;
  }, null);

  if (!nearestSlide) return slider.scrollLeft;

  const centeredPosition = getSlideCenter(nearestSlide) - slider.clientWidth / 2;
  const maxScroll = slider.scrollWidth - slider.clientWidth;

  return Math.min(Math.max(centeredPosition, 0), maxScroll);
}
