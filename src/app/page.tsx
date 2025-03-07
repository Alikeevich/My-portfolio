import dynamic from "next/dynamic";

// Use simplified components without framer-motion
const SimpleParticleBackground = dynamic(
  () => import("@/components/SimpleParticleBackground"),
  { ssr: false },
);
const SimpleNavbar = dynamic(() => import("@/components/SimpleNavbar"), {
  ssr: false,
});
const SimpleHeroSection = dynamic(
  () => import("@/components/SimpleHeroSection"),
  { ssr: false },
);
const SimpleProjectsSection = dynamic(
  () => import("@/components/SimpleProjectsSection"),
  { ssr: false },
);
const SimpleContactSection = dynamic(
  () => import("@/components/SimpleContactSection"),
  { ssr: false },
);
const SimpleFooter = dynamic(() => import("@/components/SimpleFooter"), {
  ssr: false,
});

export default function Page() {
  return (
    <main className="relative min-h-screen bg-[#0f0418]">
      <SimpleParticleBackground />
      <SimpleNavbar />
      <SimpleHeroSection />
      <SimpleProjectsSection />
      <SimpleContactSection />
      <SimpleFooter />
    </main>
  );
}
