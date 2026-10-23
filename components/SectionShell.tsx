type SectionShellProps = {
  id: string;
  index: string;
  label: string;
  title: string;
};

export default function SectionShell({
  id,
  index,
  label,
  title,
}: SectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-20 py-20 min-[900px]:scroll-mt-6 min-[900px]:py-24"
    >
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="h-px w-8 bg-accent" />
        <p className="eyebrow text-accent">
          {index} / {label}
        </p>
      </div>
      <h2 id={`${id}-title`} className="section-title mt-6">
        {title}
      </h2>
    </section>
  );
}
