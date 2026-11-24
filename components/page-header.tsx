/** En-tête des pages intérieures (fond clair). */
export function PageHeader({ kicker, title, lead, children }: { kicker?: string; title: string; lead?: string; children?: React.ReactNode }) {
  return (
    <header className="bg-papier pb-16 pt-36 lg:pb-24 lg:pt-48">
      <div className="wrap grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {kicker ? <p className="kicker text-ardoise" style={{ animation: "line-in 1s var(--ease-cine) both" }}>{kicker}</p> : null}
          <h1 className="display mt-5 text-[clamp(3rem,8vw,7.5rem)]">
            <span className="line-mask">
              <span>{title}</span>
            </span>
          </h1>
        </div>
        {lead ? (
          <p className="self-end text-lg leading-relaxed text-ardoise lg:col-span-4">
            {lead}
          </p>
        ) : null}
        {children}
      </div>
    </header>
  );
}
