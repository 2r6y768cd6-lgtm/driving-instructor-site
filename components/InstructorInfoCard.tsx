"use client";

export type Instructor = {
  label: string;
  name: string;
  initials: string;
  details: Array<[string, string]>;
  supportingLine: string;
  benefits: string[];
};

type InstructorInfoCardProps = {
  instructor: Instructor;
  onBook: () => void;
};

export default function InstructorInfoCard({
  instructor,
  onBook,
}: InstructorInfoCardProps) {
  function handleBookClick() {
    onBook();
  }

  return (
    <div
      data-info
      className="pointer-events-auto relative z-20 mx-auto w-full max-w-xl rounded-[2rem] border border-[#084038]/10 bg-white p-6 text-black shadow-[0_24px_70px_rgba(0,0,0,0.08)] sm:p-8"
    >
      <div className="flex items-center gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full border border-[#084038]/15 bg-[#F0F0F0] text-xl font-semibold text-[#084038]">
          {instructor.initials}
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#21C45A]">
            {instructor.label}
          </p>
          <h2 className="mt-1 text-3xl font-semibold leading-tight text-[#084038]">
            {instructor.name}
          </h2>
        </div>
      </div>

      <dl className="mt-7 grid gap-3 text-sm">
        {instructor.details.map(([label, value]) => (
          <div
            key={label}
            className="flex flex-col gap-1 rounded-2xl bg-[#F0F0F0] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <dt className="text-black/56">{label}</dt>
            <dd className="font-semibold text-black">{value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 text-base leading-7 text-black/72">
        {instructor.supportingLine}
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {instructor.benefits.map((benefit) => (
          <li
            key={benefit}
            className="rounded-full border border-[#084038]/10 px-4 py-3 text-sm font-semibold text-black/78"
          >
            {benefit}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={handleBookClick}
        aria-haspopup="dialog"
        className="pointer-events-auto relative z-30 mt-7 inline-flex min-h-12 w-full cursor-pointer touch-manipulation select-none items-center justify-center rounded-full bg-[#084038] px-6 text-sm font-bold text-white transition hover:bg-[#06342e] focus:outline-none focus:ring-2 focus:ring-[#21C45A] focus:ring-offset-2"
      >
        Записаться
      </button>
    </div>
  );
}
