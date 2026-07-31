import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CredentialCarousel from "@/components/CredentialCarousel";
import CredentialStrip from "@/components/CredentialStrip";
import ConnectedHoneycomb from "@/components/ConnectedHoneycomb";
import WorkflowDemo from "@/components/WorkflowDemo";
import Authority from "@/components/Authority";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, pageSchema, websiteSchema } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <JsonLd
        nodes={[
          organizationSchema,
          websiteSchema,
          pageSchema({
            type: "WebPage",
            path: "/",
            name: "EPM Journey | Master Anaplanner — Connected Planning Consulting",
            description:
              "Escape spreadsheet hell. A Certified Master Anaplanner and team of enterprise practitioners replacing fragile Excel models with automated, connected planning.",
          }),
        ]}
      />
      <Header />
      <main>
        <Hero />
        <CredentialCarousel />
        <CredentialStrip />
        <ConnectedHoneycomb />
        <WorkflowDemo />
        <Authority />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
