export type PddSection = {
  number: string;
  slug: string;
  title: string;
  description: string;
  reference: string;
  href: `https://pdd24.com/${string}`;
};

export const pddSections = [
  {
    number: "01",
    slug: "driver-duties",
    title: "Общие обязанности водителей",
    description:
      "Требования к документам и состоянию водителя, обязанности при ДТП и действия, которые водителю запрещены.",
    reference: "Раздел 2 ПДД РФ",
    href: "https://pdd24.com/pdd/pdd2",
  },
  {
    number: "02",
    slug: "traffic-lights",
    title: "Сигналы светофора и регулировщика",
    description:
      "Значение сигналов светофора, дополнительных секций и жестов регулировщика.",
    reference: "Раздел 6 ПДД РФ",
    href: "https://pdd24.com/pdd/pdd6",
  },
  {
    number: "03",
    slug: "maneuvers",
    title: "Начало движения и маневрирование",
    description:
      "Правила начала движения, перестроения, поворота, разворота и движения задним ходом.",
    reference: "Раздел 8 ПДД РФ",
    href: "https://pdd24.com/pdd/pdd8",
  },
  {
    number: "04",
    slug: "road-position",
    title: "Расположение транспортных средств на проезжей части",
    description:
      "Правила выбора полосы движения, расположения автомобиля и движения по дорогам с несколькими полосами.",
    reference: "Раздел 9 ПДД РФ",
    href: "https://pdd24.com/pdd/pdd9",
  },
  {
    number: "05",
    slug: "speed",
    title: "Скорость движения",
    description:
      "Ограничения скорости и обязанности водителя при выборе безопасной скорости движения.",
    reference: "Раздел 10 ПДД РФ",
    href: "https://pdd24.com/pdd/pdd10",
  },
  {
    number: "06",
    slug: "overtaking",
    title: "Обгон, опережение и встречный разъезд",
    description:
      "Условия выполнения обгона и опережения, а также правила встречного разъезда.",
    reference: "Раздел 11 ПДД РФ",
    href: "https://pdd24.com/pdd/pdd11",
  },
  {
    number: "07",
    slug: "parking",
    title: "Остановка и стоянка",
    description:
      "Правила остановки и стоянки транспортных средств, а также места, где они запрещены.",
    reference: "Раздел 12 ПДД РФ",
    href: "https://pdd24.com/pdd/pdd12",
  },
  {
    number: "08",
    slug: "intersections",
    title: "Проезд перекрёстков",
    description:
      "Правила проезда регулируемых и нерегулируемых перекрёстков.",
    reference: "Раздел 13 ПДД РФ",
    href: "https://pdd24.com/pdd/pdd13",
  },
  {
    number: "09",
    slug: "pedestrians",
    title: "Пешеходные переходы и места остановок маршрутных транспортных средств",
    description:
      "Обязанности водителей при проезде пешеходных переходов и остановок маршрутного транспорта.",
    reference: "Раздел 14 ПДД РФ",
    href: "https://pdd24.com/pdd/pdd14",
  },
  {
    number: "10",
    slug: "priority",
    title: "Приоритет и знаки приоритета",
    description:
      "Знаки, устанавливающие очерёдность проезда перекрёстков, пересечений и узких участков дороги.",
    reference: "Знаки приоритета",
    href: "https://pdd24.com/pdd/znak2",
  },
  {
    number: "11",
    slug: "signs",
    title: "Дорожные знаки",
    description:
      "Основные группы дорожных знаков, их назначение и применение.",
    reference: "Дорожные знаки",
    href: "https://pdd24.com/pdd/znak1",
  },
  {
    number: "12",
    slug: "markings",
    title: "Дорожная разметка и её характеристики",
    description:
      "Виды горизонтальной и вертикальной дорожной разметки и их значение.",
    reference: "Дорожная разметка",
    href: "https://pdd24.com/pdd/razm1",
  },
] as const satisfies readonly PddSection[];
