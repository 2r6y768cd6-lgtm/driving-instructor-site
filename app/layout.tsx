import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Сел - сдал | Уроки вождения на МКПП",
  description:
    "Спокойное и понятное обучение вождению на МКПП с двумя инструкторами. Занятия 1 час и 1,5 часа, подготовка к экзамену на категорию B.",
  openGraph: {
    title: "Сел - сдал | Частные уроки вождения на МКПП",
    description:
      "Премиальные уроки вождения на МКПП: городские маршруты, манёвры, парковка и подготовка к экзамену.",
    type: "website",
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
