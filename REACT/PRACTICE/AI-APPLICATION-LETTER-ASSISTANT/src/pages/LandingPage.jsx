import Hero from "../components/Hero.jsx";
import Features from "../components/Features.jsx";
import HowItWorks from "../components/HowItWorks.jsx";

const LandingPage = () => {
  return (
    <div>
      <h2>Welcome to the Landing Page</h2>

      <Hero />
      <HowItWorks />
      <Features />
    </div>
  );
};

export default LandingPage;
