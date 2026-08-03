import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const SITE_URL = "https://www.selsdal.ru";
const GOOGLE_TAG_ID = "G-EKWS104RCL";
const YANDEX_METRIKA_ID = 111278232;
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
  verification: {
    google: "kNXOVbdlppd_8aiAio1c6b6Ad6hwUE9GwHBE_507gq8",
    yandex: "12bb0736b4b6eab0",
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
      <body>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_TAG_ID}');
          `}
        </Script>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}', 'ym');

              ym(${YANDEX_METRIKA_ID}, 'init', {ssr:true, webvisor:true, clickmap:true, referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
            `,
          }}
        />
        <noscript>
          <div>
            <img
              src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
        {children}
      </body>
    </html>
  );
}
