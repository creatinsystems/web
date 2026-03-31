import { getRegion } from "@/lib/region";
import { Hero } from "@/components/sections/hero";
import { Agitation } from "@/components/sections/agitation";
import { Solution } from "@/components/sections/solution";
import { SocialProof } from "@/components/sections/social-proof";
import { CtaForm } from "@/components/sections/cta-form";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Creatin Systems",
  url: "https://creatinsystems.com",
  description: "Cloud-native infrastructure and consumer-grade UI for modern product teams.",
  foundingDate: "2024",
  sameAs: [],
};

export default async function Home() {
  const region = await getRegion();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero region={region} />
      <Agitation />
      <Solution />
      <SocialProof region={region} />
      <CtaForm />
    </>
  );
}
