import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://www.selsdal.ru";
const SITE_TITLE = "Автоинструктор в Набережных Челнах | Сел — сдал";
const SITE_DESCRIPTION =
  "Индивидуальные уроки вождения на МКПП в Набережных Челнах: город, парковка, манёвры и подготовка к экзамену на категорию B.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Сел — сдал",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "автоинструктор Набережные Челны",
    "уроки вождения Набережные Челны",
    "обучение вождению МКПП",
    "подготовка к экзамену ГИБДД",
    "вождение категория B",
    "частный инструктор по вождению",
  ],
  applicationName: "Сел — сдал",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    url: "/",
    siteName: "Сел — сдал",
    locale: "ru_RU",
    images: [
      {
        url: "/images/gallery/gallery-2.PNG",
        width: 1448,
        height: 1086,
        alt: "Учебные автомобили инструкторов «Сел — сдал»",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/gallery/gallery-2.PNG"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
