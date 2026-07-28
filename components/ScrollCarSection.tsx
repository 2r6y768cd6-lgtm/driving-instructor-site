"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import BookingModal, {
  defaultBookingModalContent,
  type BookingModalContent,
} from "@/components/BookingModal";
import InstructorInfoCard, {
  type Instructor,
} from "@/components/InstructorInfoCard";

type Car = {
  id: string;
  carSrc: string;
  width: number;
  height: number;
  alt: string;
  priority: boolean;
  direction: "left" | "right";
};

const cars: Car[] = [
  {
    id: "car-1",
    // Ожидаемый файл: public/images/car-1.png
    carSrc: "/images/car-1.png",
    width: 1318,
    height: 1193,
    alt: "Белый учебный автомобиль первого инструктора",
    priority: true,
    direction: "left",
  },
  {
    id: "car-2",
    // Ожидаемый файл: public/images/car-2.png
    carSrc: "/images/car-2.png",
    width: 1448,
    height: 1086,
    alt: "Белый учебный автомобиль инструктора Виктории",
    priority: false,
    direction: "right",
  },
];

const firstInstructor: Instructor = {
  label: "Инструктор",
  name: "Сергей",
  initials: "С",
  details: [
    ["Авто", "Lada Vesta NG"],
    ["Коробка передач", "МКПП"],
    ["Время занятий", "с 7:00 до 20:00"],
    ["Длительность", "1 час и 1,5 часа"],
  ],
  supportingLine:
    "Поможет спокойно освоить городское вождение, уверенно чувствовать автомобиль и подготовиться к реальным дорожным ситуациям.",
  benefits: [
    "Обучение с нуля",
    "Подготовка к экзамену",
    "Практика маршрутов",
    "Разбор ошибок без давления",
  ],
};

const victoriaInstructor: Instructor = {
  label: "Инструктор",
  name: "Виктория",
  initials: "В",
  details: [
    ["Авто", "Лада Веста GFL"],
    ["Коробка передач", "МКПП"],
    ["Время занятий", "с 7:00 до 18:00"],
    ["Длительность", "1 час и 1,5 часа"],
  ],
  supportingLine:
    "Спокойное обучение без давления — с понятной практикой и уверенностью за рулём.",
  benefits: [
    "Подготовка к экзамену",
    "Практика в городе",
    "Парковка и манёвры",
    "Индивидуальный подход",
  ],
};

const sergeyBookingModalContent: BookingModalContent = {
  title: "Запись к Сергею",
  text: "Выберите удобный способ связи, чтобы записаться на занятие.",
  links: [
    { label: "Telegram", href: "https://t.me/serdgio_180" },
    { label: "WhatsApp", href: "https://wa.me/message/EO72WWMLNRMPC1" },
  ],
};

const victoriaBookingModalContent: BookingModalContent = {
  title: "Запись к Виктории",
  text: "Выберите удобный способ связи, чтобы записаться на занятие.",
  links: [
    { label: "Telegram", href: "https://t.me/zlondix" },
    { label: "WhatsApp", href: "https://wa.me/message/OGD7PZZ5CXQKD1" },
    { label: "Max", disabled: true },
  ],
};

type CarImageProps = {
  car: Car;
  className?: string;
  onLoad?: () => void;
  wrapperRef: RefObject<HTMLDivElement | null>;
};

function CarImage({
  car,
  className = "",
  onLoad,
  wrapperRef,
}: CarImageProps) {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <div
      ref={wrapperRef}
      data-car
      data-direction={car.direction}
      className={`pointer-events-none relative z-10 mx-auto max-w-none will-change-transform ${className}`}
    >
      <div className="pointer-events-none absolute bottom-[7%] left-[12%] right-[10%] h-4 rounded-full bg-black/[0.05] shadow-[0_0_34px_rgba(0,0,0,0.13)]" />
      {hasImageError ? (
        <div className="relative flex aspect-[16/10] w-full items-center justify-center rounded-[1.5rem] border border-[#084038]/10 bg-white/70 px-6 text-center shadow-[0_18px_50px_rgba(0,0,0,0.05)]">
          <p className="text-base font-semibold text-[#084038]">
            Изображение автомобиля скоро появится
          </p>
        </div>
      ) : (
        <Image
          src={car.carSrc}
          alt={car.alt}
          width={car.width}
          height={car.height}
          sizes="(min-width: 1280px) 1120px, 100vw"
          className="relative h-auto w-full object-contain"
          priority={car.priority}
          onError={() => setHasImageError(true)}
          onLoad={onLoad}
        />
      )}
    </div>
  );
}

export default function ScrollCarSection() {
  const rootRef = useRef<HTMLElement | null>(null);
  const firstSectionRef = useRef<HTMLElement | null>(null);
  const secondSectionRef = useRef<HTMLElement | null>(null);
  const firstCarRef = useRef<HTMLDivElement | null>(null);
  const secondCarRef = useRef<HTMLDivElement | null>(null);
  const firstInfoRef = useRef<HTMLDivElement | null>(null);
  const secondInfoRef = useRef<HTMLDivElement | null>(null);
  const refreshScrollTriggerRef = useRef<(() => void) | null>(null);
  const refreshDelayRef = useRef<number | undefined>(undefined);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingModalContent, setBookingModalContent] =
    useState<BookingModalContent>(defaultBookingModalContent);

  const openBooking = useCallback((content: BookingModalContent) => {
    setBookingModalContent(content);
    setIsBookingOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setIsBookingOpen(false);
  }, []);

  const scheduleScrollRefresh = useCallback(() => {
    if (!refreshScrollTriggerRef.current) {
      return;
    }

    requestAnimationFrame(() => {
      refreshScrollTriggerRef.current?.();
    });

    if (refreshDelayRef.current) {
      window.clearTimeout(refreshDelayRef.current);
    }

    refreshDelayRef.current = window.setTimeout(() => {
      refreshScrollTriggerRef.current?.();
    }, 150);
  }, []);

  useLayoutEffect(() => {
    if (!rootRef.current) {
      return;
    }

    let orientationRefreshId: number | undefined;
    let viewportRefreshId: number | undefined;
    let matchMedia: ReturnType<typeof gsap.matchMedia> | undefined;

    gsap.registerPlugin(ScrollTrigger);

    refreshScrollTriggerRef.current = () => {
      ScrollTrigger.refresh();
    };

    const carItems = [
      {
        section: firstSectionRef.current,
        car: firstCarRef.current,
        direction: "left" as const,
      },
      {
        section: secondSectionRef.current,
        car: secondCarRef.current,
        direction: "right" as const,
      },
    ].filter(
      (
        item,
      ): item is {
        section: HTMLElement;
        car: HTMLDivElement;
        direction: "left" | "right";
      } => Boolean(item.section && item.car),
    );

    const infoItems = [firstInfoRef.current, secondInfoRef.current].filter(
      (item): item is HTMLDivElement => Boolean(item),
    );

    const context = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        carItems.forEach(({ car }) => {
          gsap.set(car, {
            xPercent: 0,
            scale: 1,
            opacity: 1,
            clearProps: "transform",
          });
        });
        gsap.set(infoItems, {
          autoAlpha: 1,
          y: 0,
        });
        return;
      }

      function createCarAnimations({
        travel,
        startScale,
        start,
        end,
      }: {
        travel: number;
        startScale: number;
        start: string;
        end: string;
      }) {
        carItems.forEach(({ section, car, direction }) => {
          gsap.fromTo(
            car,
            {
              xPercent: direction === "right" ? travel : -travel,
              scale: startScale,
              opacity: 0.9,
              transformOrigin: "center center",
              force3D: true,
            },
            {
              xPercent: 0,
              scale: 1,
              opacity: 1,
              ease: "none",
              immediateRender: true,
              overwrite: "auto",
              scrollTrigger: {
                trigger: section,
                start,
                end,
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            },
          );
        });
      }

      matchMedia = gsap.matchMedia();

      matchMedia.add("(min-width: 768px)", () => {
        createCarAnimations({
          travel: 70,
          startScale: 0.78,
          start: "top 85%",
          end: "center 45%",
        });
      });

      matchMedia.add("(max-width: 767px)", () => {
        createCarAnimations({
          travel: 35,
          startScale: 0.88,
          start: "top 90%",
          end: "center 55%",
        });
      });

      infoItems.forEach((info) => {
        gsap.fromTo(
          info,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: {
              trigger: info,
              start: "top 86%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
            },
          },
        );
      });
    }, rootRef);

    scheduleScrollRefresh();

    function handleOrientationChange() {
      if (orientationRefreshId) {
        window.clearTimeout(orientationRefreshId);
      }

      orientationRefreshId = window.setTimeout(
        () => scheduleScrollRefresh(),
        300,
      );
    }

    function handleWindowLoad() {
      scheduleScrollRefresh();
    }

    function handleViewportResize() {
      if (viewportRefreshId) {
        window.clearTimeout(viewportRefreshId);
      }

      viewportRefreshId = window.setTimeout(() => {
        scheduleScrollRefresh();
      }, 180);
    }

    window.addEventListener("load", handleWindowLoad);
    window.addEventListener("orientationchange", handleOrientationChange);
    window.addEventListener("resize", handleViewportResize);
    window.visualViewport?.addEventListener("resize", handleViewportResize);

    return () => {
      if (orientationRefreshId) {
        window.clearTimeout(orientationRefreshId);
      }
      if (viewportRefreshId) {
        window.clearTimeout(viewportRefreshId);
      }
      if (refreshDelayRef.current) {
        window.clearTimeout(refreshDelayRef.current);
      }
      window.removeEventListener("load", handleWindowLoad);
      window.removeEventListener("orientationchange", handleOrientationChange);
      window.removeEventListener("resize", handleViewportResize);
      window.visualViewport?.removeEventListener("resize", handleViewportResize);
      refreshScrollTriggerRef.current = null;
      matchMedia?.revert();
      context?.revert();
    };
  }, [scheduleScrollRefresh]);

  return (
    <section
      ref={rootRef}
      className="w-full max-w-full overflow-x-hidden bg-[#F0F0F0] px-0 pb-24 text-black"
    >
      <div className="grid gap-20 sm:gap-28">
        <section
          ref={firstSectionRef}
          data-car-section
          aria-label="Первый инструктор и учебный автомобиль"
          className="grid min-h-[72svh] w-full max-w-full items-center gap-8 overflow-hidden px-5 sm:px-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(280px,0.88fr)] lg:gap-10 lg:px-12"
        >
          <div className="order-1 min-w-0">
            <CarImage
              car={cars[0]}
              className="w-full max-w-[1040px] lg:ml-auto lg:max-w-[1120px]"
              onLoad={scheduleScrollRefresh}
              wrapperRef={firstCarRef}
            />
          </div>

          <div
            ref={firstInfoRef}
            className="pointer-events-auto relative z-30 order-2 min-w-0 lg:mr-auto"
          >
            <InstructorInfoCard
              instructor={firstInstructor}
              onBook={() => openBooking(sergeyBookingModalContent)}
            />
          </div>
        </section>

        <section
          ref={secondSectionRef}
          data-car-section
          aria-label="Инструктор Виктория и учебный автомобиль"
          className="grid min-h-[72svh] w-full max-w-full items-center gap-8 overflow-hidden px-5 sm:px-8 lg:grid-cols-[minmax(280px,0.82fr)_minmax(0,1.18fr)] lg:gap-10 lg:px-12"
        >
          <div
            ref={secondInfoRef}
            className="pointer-events-auto relative z-30 order-2 min-w-0 lg:order-1 lg:ml-auto"
          >
            <InstructorInfoCard
              instructor={victoriaInstructor}
              onBook={() => openBooking(victoriaBookingModalContent)}
            />
          </div>

          <div className="order-1 min-w-0 lg:order-2">
            <CarImage
              car={cars[1]}
              className="w-full max-w-[1120px] lg:mr-auto lg:max-w-[1240px]"
              onLoad={scheduleScrollRefresh}
              wrapperRef={secondCarRef}
            />
          </div>
        </section>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={closeBooking}
        content={bookingModalContent}
      />
    </section>
  );
}
