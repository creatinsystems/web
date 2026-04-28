import type { Graph } from "schema-dts";

import { getRegion, getSiteOrigin } from "@/lib/region";
import type { Region } from "@/lib/region";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { CaseStudies } from "@/components/sections/case-studies";
import { About } from "@/components/sections/about";
import { CtaForm } from "@/components/sections/cta-form";

function buildJsonLd(region: Region): Graph {
  const canonicalOrigin = getSiteOrigin("global");
  const siteUrl = getSiteOrigin(region);
  const otherOrigin = getSiteOrigin(region === "id" ? "global" : "id");
  const orgId = `${canonicalOrigin}#organization`;
  const websiteId = `${siteUrl}#website`;
  const serviceAreaServed =
    region === "id"
      ? { "@type": "Country" as const, name: "Indonesia" }
      : { "@type": "Place" as const, name: "Worldwide" };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: "Creatin Systems",
        url: canonicalOrigin,
        logo: {
          "@type": "ImageObject",
          url: `${canonicalOrigin}/icon.svg`,
        },
        description: "Cloud-native infrastructure and consumer-grade UI for modern product teams.",
        foundingDate: "2026-04-01",
        sameAs: ["https://github.com/creatinsystems", otherOrigin],
        areaServed: { "@type": "Place", name: "Worldwide" },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: "Creatin Systems",
        inLanguage: "en",
        publisher: { "@id": orgId },
      },
      {
        "@type": "Service",
        name: "AI-Augmented Execution",
        category: "Velocity",
        description:
          "We utilize proprietary internal AI workflows to automate boilerplate, testing, and DevOps. You get the output of a 10-person team with the quality control of 3 senior architects.",
        provider: { "@id": orgId },
        areaServed: serviceAreaServed,
      },
      {
        "@type": "Service",
        name: "Cloud-Native Reliability",
        category: "Infrastructure",
        description:
          "Zero manual server deployments. We build enterprise-grade K8s and Docker architectures that refuse to crash under pressure.",
        provider: { "@id": orgId },
        areaServed: serviceAreaServed,
      },
      {
        "@type": "Service",
        name: "Consumer-Grade UI",
        category: "Aesthetics",
        description:
          "B2B software shouldn’t require a training manual. We design hyper-polished interfaces that your team will actually love using.",
        provider: { "@id": orgId },
        areaServed: serviceAreaServed,
      },
    ],
  };
}

export default async function Home() {
  const region = await getRegion();
  const jsonLd = buildJsonLd(region);

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
