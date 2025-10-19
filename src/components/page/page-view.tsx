import type { ReactNode } from "react";
import type { Page } from "contentlayer/generated";

type HeroCTA = {
  label: string;
  href: string;
};

type HeroContent = {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  primaryCta?: HeroCTA;
  secondaryCta?: HeroCTA;
  badges?: string[];
};

type SectionCard = {
  eyebrow?: string;
  title: string;
  description?: string;
  caption?: string;
  price?: string;
  cta?: HeroCTA;
  features?: string[];
};

type SectionContent = {
  id?: string;
  eyebrow?: string;
  heading?: string;
  body?: string;
  bullets?: string[];
  cards?: SectionCard[];
  cta?: HeroCTA;
};

function renderBodyCopy(body?: string): ReactNode {
  if (!body) return null;

  const paragraphs = body.split(/\n{2,}/).map((paragraph) => paragraph.trim());

  return (
    <div className="space-y-4 text-base text-muted-foreground sm:text-lg">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

function SectionCards({ cards }: { cards: SectionCard[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {cards.map((card) => (
        <div
          key={card.title}
          className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/70 p-6 shadow-[0_12px_45px_-24px_rgba(124,77,255,0.45)] transition hover:-translate-y-1 hover:shadow-[0_24px_65px_-30px_rgba(0,191,166,0.45)]"
        >
          {card.eyebrow ? (
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {card.eyebrow}
            </span>
          ) : null}
          <h3 className="mt-2 text-xl font-semibold text-foreground">
            {card.title}
          </h3>
          {card.price ? (
            <p className="mt-3 text-3xl font-semibold text-primary">
              {card.price}
            </p>
          ) : null}
          {card.description ? (
            <p className="mt-3 text-sm text-muted-foreground">
              {card.description}
            </p>
          ) : null}
          {card.features ? (
            <ul className="mt-4 space-y-2 text-sm text-foreground">
              {card.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {card.caption ? (
            <p className="mt-4 text-xs text-muted-foreground">{card.caption}</p>
          ) : null}
          {card.cta ? (
            <a
              href={card.cta.href}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary/10"
            >
              {card.cta.label}
            </a>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function SectionContentBlock({ section }: { section: SectionContent }) {
  const hasContent =
    section.body ||
    (section.bullets && section.bullets.length > 0) ||
    (section.cards && section.cards.length > 0) ||
    section.cta;

  return (
    <section
      id={section.id}
      className="rounded-3xl border border-border/50 bg-card/60 p-8 backdrop-blur transition hover:border-border/70 sm:p-10"
    >
      <div className="space-y-4">
        {section.eyebrow ? (
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            {section.eyebrow}
          </span>
        ) : null}
        {section.heading ? (
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            {section.heading}
          </h2>
        ) : null}
        {hasContent ? (
          <div className="space-y-4">
            {renderBodyCopy(section.body)}
            {section.bullets ? (
              <ul className="grid gap-2 text-base text-muted-foreground sm:text-lg">
                {section.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-[10px] h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {section.cards ? <SectionCards cards={section.cards} /> : null}
            {section.cta ? (
              <a
                href={section.cta.href}
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary/10"
              >
                {section.cta.label}
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function PageView({ page }: { page: Page }) {
  const hero = (page.hero ?? {}) as HeroContent;
  const sections = Array.isArray(page.sections)
    ? (page.sections as SectionContent[])
    : [];

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 py-16 sm:px-8">
      {hero.headline ? (
        <section className="flex flex-col gap-6 rounded-3xl border border-border/40 bg-elevated/70 p-10 text-balance shadow-[0_20px_60px_-32px_rgba(124,77,255,0.45)] backdrop-blur">
          {hero.eyebrow ? (
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              {hero.eyebrow}
            </span>
          ) : null}
          <h1 className="text-4xl font-semibold sm:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>
          {hero.subheadline ? (
            <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
              {hero.subheadline}
            </p>
          ) : null}
          {hero.badges && hero.badges.length > 0 ? (
            <div className="flex flex-wrap gap-3 pt-1">
              {hero.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-primary/25 bg-white/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-primary"
                >
                  {badge}
                </span>
              ))}
            </div>
          ) : null}
          <div className="flex flex-wrap gap-4 pt-2">
            {hero.primaryCta ? (
              <a
                href={hero.primaryCta.href}
                className="rounded-full bg-gradient-to-r from-[#7C4DFF] via-[#00BFA6] to-[#00E5FF] px-6 py-3 text-base font-semibold text-white shadow-[0_12px_30px_-16px_rgba(124,77,255,0.8)] transition hover:shadow-[0_16px_40px_-16px_rgba(0,229,255,0.55)]"
              >
                {hero.primaryCta.label}
              </a>
            ) : null}
            {hero.secondaryCta ? (
              <a
                href={hero.secondaryCta.href}
                className="rounded-full border border-primary/30 px-6 py-3 text-base font-semibold text-primary transition hover:border-primary hover:bg-primary/5"
              >
                {hero.secondaryCta.label}
              </a>
            ) : null}
          </div>
        </section>
      ) : null}

      {sections.length > 0
        ? sections.map((section) => (
            <SectionContentBlock key={section.id ?? section.heading} section={section} />
          ))
        : null}
    </main>
  );
}
