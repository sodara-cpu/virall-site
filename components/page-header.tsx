/** En-tête des pages intérieures : titre de presse, chapô en Garamond, filet de séparation. */
export function PageHeader({ kicker, title, lead, children }: { kicker?: string; title: string; lead?: string; children?: React.ReactNode }) {
  return (
    <header className="bg-blanc pt-32 lg:pt-44">
      <div className="wrap">
        <div className="grid gap-8 border-b border-encre/15 pb-12 lg:grid-cols-12 lg:pb-16">
          <div className="lg:col-span-7">
            {kicker ? <p className="rubric text-ardoise">{kicker}</p> : null}
            <h1 className={`display text-[clamp(2.6rem,5.6vw,5.2rem)] ${kicker ? "mt-3" : ""}`}>
              <span className="line-mask">
                <span>{title}</span>
              </span>
            </h1>
          </div>
          {lead ? <p className="dek self-end text-encre/80 lg:col-span-4 lg:col-start-9">{lead}</p> : null}
        </div>
        {children}
      </div>
    </header>
  );
}
