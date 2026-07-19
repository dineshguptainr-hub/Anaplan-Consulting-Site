import type { Metadata } from "next";
import Header from "@/components/Header";
import PainPleasure from "@/components/PainPleasure";
import Capabilities from "@/components/Capabilities";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Services | Dinesh Gupta — Connected Planning Consulting",
  description:
    "From fragile spreadsheets to automated, connected planning — see the transformation and the Anaplan capabilities behind it.",
};

export default function Services() {
  return (
    <>
      <Header />
      <main>
        <PainPleasure />
        <Capabilities />
      </main>
      <Footer />
    </>
  );
}
