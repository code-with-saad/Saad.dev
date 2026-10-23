type SectionShellProps = {
  id: string;
  index: string;
  label: string;
};

export default function SectionShell({
  id,
  index,
  label,
}: SectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-[138px] py-20 min-[900px]:scroll-mt-[72px] min-[900px]:py-24"
    >
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="h-px w-8 bg-accent" />
        <p className="eyebrow text-accent">
          {index} / {label}
        </p>
      </div>
      <h2 id={`${id}-title`} className="section-title mt-6">
        {label}
      </h2>
    </section>
  );
}
