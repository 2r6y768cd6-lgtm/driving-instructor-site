"use client";

import {
  useEffect,
  useId,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent,
} from "react";

export type MessengerLink = {
  label: "Telegram" | "WhatsApp" | "Max";
  href?: string;
  disabled?: boolean;
};

export type BookingModalContent = {
  title: string;
  text: string;
  links: MessengerLink[];
};

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  content: BookingModalContent;
};

export const defaultBookingModalContent: BookingModalContent = {
  title: "Выберите удобный способ связи",
  text: "Напишите нам в мессенджер, и мы подберём удобное время занятия.",
  links: [],
};

export default function BookingModal({
  isOpen,
  onClose,
  content,
}: BookingModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const openedAtRef = useRef(0);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    openedAtRef.current = Date.now();
    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedRef.current?.focus();
      previouslyFocusedRef.current = null;
    };
  }, [isOpen, onClose]);

  function handleDialogKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab" || !dialogRef.current) {
      return;
    }

    const focusableElements = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );

    if (focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  function handleBackdropClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (Date.now() - openedAtRef.current < 350) {
      return;
    }

    onClose();
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex min-h-[100dvh] items-center justify-center overflow-y-auto bg-black/45 px-4 py-6"
      onClick={handleBackdropClick}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-[2rem] border border-[#084038]/10 bg-white p-6 text-black shadow-[0_32px_90px_rgba(0,0,0,0.22)] sm:p-8"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={handleDialogKeyDown}
      >
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#084038]">
              Запись
            </p>
            <h2
              id={titleId}
              className="mt-3 text-3xl font-semibold leading-tight text-[#084038]"
            >
              {content.title}
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#084038]/15 text-xl leading-none text-[#084038] transition hover:bg-[#F0F0F0] focus:outline-none focus:ring-2 focus:ring-[#084038] focus:ring-offset-2"
            aria-label="Закрыть окно записи"
          >
            ×
          </button>
        </div>

        <p id={descriptionId} className="mt-4 text-base leading-7 text-black/68">
          {content.text}
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {content.links.map((link) => {
            const isSafeLink = Boolean(
              link.href && isSafeExternalHref(link.href),
            );

            return link.disabled || !isSafeLink ? (
              <button
                key={link.label}
                type="button"
                disabled
                className="inline-flex min-h-12 cursor-not-allowed items-center justify-center rounded-full bg-[#084038] px-5 text-sm font-bold !text-white opacity-55"
              >
                {link.label}
              </button>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#084038] px-5 text-sm font-bold !text-white transition visited:!text-white hover:bg-[#06342e] hover:!text-white focus:!text-white focus:outline-none focus:ring-2 focus:ring-[#084038] focus:ring-offset-2 active:!text-white"
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function isSafeExternalHref(href: string) {
  try {
    return new URL(href).protocol === "https:";
  } catch {
    return false;
  }
}
