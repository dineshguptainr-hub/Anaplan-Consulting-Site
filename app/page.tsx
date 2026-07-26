import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CredentialCarousel from "@/components/CredentialCarousel";
import CredentialStrip from "@/components/CredentialStrip";
import ConnectedHoneycomb from "@/components/ConnectedHoneycomb";
import WorkflowDemo from "@/components/WorkflowDemo";
import Authority from "@/components/Authority";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
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
