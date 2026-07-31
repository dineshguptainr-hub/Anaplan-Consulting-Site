import type { Metadata } from "next";
import Header from "@/components/Header";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, pageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact | EPM Journey — Connected Planning Consulting",
  description:
    "Book a Model Audit and start replacing fragile Excel planning with automated, connected Anaplan models.",
};

export default function Contact() {
  return (
    <>
      <JsonLd
        nodes={[
          organizationSchema,
          pageSchema({
            type: "ContactPage",
            path: "/contact/",
            name: "Contact EPM Journey",
            description:
              "Book a Model Audit and start replacing fragile Excel planning with automated, connected Anaplan models.",
          }),
        ]}
      />
      <Header />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
