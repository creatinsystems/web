import { getRegion } from "@/lib/region";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { CaseStudies } from "@/components/sections/case-studies";
import { About } from "@/components/sections/about";
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
      <Services />
      <CaseStudies region={region} />
      <About />
      <CtaForm />
    </>
  );
}
