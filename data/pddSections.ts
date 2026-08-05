export type PddSection = {
  slug: string;
  title: string;
  description: string;
  reference: string;
  href: `/pdd/${string}`;
};

export const pddSections = [
  {
    slug: "driver-duties",
    title: "Общие обязанности водителей",
    description:
      "Требования к документам и состоянию водителя, обязанности при ДТП и действия, которые водителю запрещены.",
    reference: "Раздел 2 ПДД РФ",
    href: "/pdd/driver-duties",
  },
  {
    slug: "traffic-lights",
    title: "Сигналы светофора и регулировщика",
    description:
      "Значение сигналов светофора и регулировщика, а также порядок действий участников движения при этих сигналах.",
    reference: "Раздел 6 ПДД РФ",
    href: "/pdd/traffic-lights",
  },
  {
    slug: "maneuvers",
    title: "Начало движения, маневрирование",
    description:
      "Требования при начале движения, перестроении, поворотах, развороте и движении задним ходом.",
    reference: "Раздел 8 ПДД РФ",
    href: "/pdd/maneuvers",
  },
  {
    slug: "road-position",
    title: "Расположение транспортных средств на проезжей части",
    description:
      "Правила выбора полосы и расположения транспортных средств с учётом дороги, разметки и условий движения.",
    reference: "Раздел 9 ПДД РФ",
    href: "/pdd/road-position",
  },
  {
    slug: "speed",
    title: "Скорость движения",
    description:
      "Ограничения скорости и требования к её выбору с учётом дорожных условий, видимости и обстановки.",
    reference: "Раздел 10 ПДД РФ",
    href: "/pdd/speed",
  },
  {
    slug: "overtaking",
    title: "Обгон, опережение, встречный разъезд",
    description:
      "Условия и запреты для обгона, порядок опережения и правила встречного разъезда.",
    reference: "Раздел 11 ПДД РФ",
    href: "/pdd/overtaking",
  },
  {
    slug: "parking",
    title: "Остановка и стоянка",
    description:
      "Способы постановки транспортного средства и места, где остановка или стоянка запрещены.",
    reference: "Раздел 12 ПДД РФ",
    href: "/pdd/parking",
  },
  {
    slug: "intersections",
    title: "Проезд перекрёстков",
    description:
      "Очередность и требования при проезде регулируемых и нерегулируемых перекрёстков.",
    reference: "Раздел 13 ПДД РФ",
    href: "/pdd/intersections",
  },
  {
    slug: "pedestrians",
    title: "Пешеходные переходы и места остановок маршрутных транспортных средств",
    description:
      "Действия водителей перед переходами, правила пропуска пешеходов и требования в местах остановок маршрутного транспорта.",
    reference: "Раздел 14 ПДД РФ",
    href: "/pdd/pedestrians",
  },
  {
    slug: "priority",
    title: "Приоритет и знаки приоритета",
    description:
      "Знаки, устанавливающие очерёдность проезда перекрёстков, пересечений проезжих частей и узких участков дороги.",
    reference: "Приложение 1, раздел 2",
    href: "/pdd/priority",
  },
  {
    slug: "signs",
    title: "Дорожные знаки",
    description:
      "Группы дорожных знаков, их значение и особенности применения в организации дорожного движения.",
    reference: "Приложение 1 к ПДД РФ",
    href: "/pdd/signs",
  },
  {
    slug: "markings",
    title: "Дорожная разметка и её характеристики",
    description:
      "Виды горизонтальной и вертикальной разметки, их назначение и применение на дороге.",
    reference: "Приложение 2 к ПДД РФ",
    href: "/pdd/markings",
  },
] as const satisfies readonly PddSection[];
