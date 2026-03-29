import { getRegion } from "@/lib/region";
import { Hero } from "@/components/sections/hero";
import { Agitation } from "@/components/sections/agitation";
import { Solution } from "@/components/sections/solution";
import { SocialProof } from "@/components/sections/social-proof";
import { CtaForm } from "@/components/sections/cta-form";

export default async function Home() {
  const region = await getRegion();

  return (
    <>
      <Hero region={region} />
      <Agitation />
      <Solution />
      <SocialProof region={region} />
      <CtaForm />
    </>
  );
}
