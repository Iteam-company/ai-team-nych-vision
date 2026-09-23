import Popup from "./components/Popup";
import { PopupProvider } from "./components/PopupContext";
import Cases from "./sections/Cases";
import Features from "./sections/Features";
// import FinalCta from "./sections/FinalCta";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import HowItWorks from "./sections/HowItWorks";
import PainPoints from "./sections/PainPoints";
import Results from "./sections/Results";
import Stages from "./sections/Stages";
import Team from "./sections/Team";

export default function App() {
  return (
    <PopupProvider>
      <main className="page">
        <Hero />
        <Features />
        <PainPoints />
        <HowItWorks />
        <div className="light-panel">
          <Results />
          <Cases />
        </div>
        <Team />
        <Stages />
        {/* <FinalCta /> */}
      </main>
      <Footer />
      <Popup />
    </PopupProvider>
  );
}
