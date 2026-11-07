import type { Metadata } from "next";

import { LampContainer } from "@/components/aceternity/lamp";
import SocialLinksNav from "@/components/site/SocialLinksNav";
import BackLink from "@/components/ui/BackLink";
import CopyEmailButton from "@/components/ui/CopyEmailButton";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${SITE.name} about software engineering work and technical collaboration.`,
  alternates: { canonical: `${SITE.url}/contact` },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact",
  url: `${SITE.url}/contact`,
  mainEntity: {
    "@type": "Person",
    name: SITE.name,
    jobTitle: SITE.role,
    email: SITE.email,
    url: SITE.url,
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main" className="min-h-screen bg-background text-foreground">
        <div className="site-container pt-8">
          <BackLink />
        </div>

        <LampContainer>
          <p className="font-mono text-[15px] text-primary">Contact</p>
          <h1 className="mt-4 text-center text-[clamp(2.5rem,5.6vw,5rem)] font-semibold leading-none tracking-[-0.05em] text-foreground">
            Want to talk engineering?
          </h1>
          <p className="mt-6 max-w-[36rem] text-center text-[19px] font-light leading-relaxed text-muted-foreground">
            For software engineering opportunities, technical collaboration, or questions about
            my projects, email is the best way to reach me.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${SITE.email}`}
              aria-label={`Send email to ${SITE.email}`}
              className="rounded-md font-mono text-base text-foreground underline underline-offset-4 transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-lg"
            >
              {SITE.email}
            </a>
            <CopyEmailButton email={SITE.email} />
          </div>
          <SocialLinksNav className="mt-8 justify-center" exclude={["/contact"]} />
        </LampContainer>
      </main>
    </>
  );
}
