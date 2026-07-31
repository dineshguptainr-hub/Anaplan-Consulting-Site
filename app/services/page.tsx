import type { Metadata } from "next";
import Header from "@/components/Header";
import PainPleasure from "@/components/PainPleasure";
import ServicesGrid from "@/components/ServicesGrid";
import Capabilities from "@/components/Capabilities";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, pageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Services | EPM Journey — Connected Planning Consulting",
  description:
    "From fragile spreadsheets to automated, connected planning — see the transformation and the Anaplan capabilities behind it.",
};

export default function Services() {
  return (
    <>
      <JsonLd
        nodes={[
          organizationSchema,
          pageSchema({
            type: "CollectionPage",
            path: "/services/",
            name: "Anaplan Connected Planning services",
            description:
              "From fragile spreadsheets to automated, connected planning — the Anaplan capabilities behind the transformation.",
          }),
        ]}
      />
      <Header />
      <main>
        <PainPleasure />
        <ServicesGrid />
        <Capabilities />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
