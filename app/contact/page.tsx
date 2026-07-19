import type { Metadata } from "next";
import Header from "@/components/Header";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact | Dinesh Gupta — Connected Planning Consulting",
  description:
    "Book a Model Audit and start replacing fragile Excel planning with automated, connected Anaplan models.",
};

export default function Contact() {
  return (
    <>
      <Header />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
