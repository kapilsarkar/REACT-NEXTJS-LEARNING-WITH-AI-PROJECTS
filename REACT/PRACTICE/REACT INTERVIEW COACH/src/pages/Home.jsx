import NavBar from "../components/NavBar.jsx";
import Hero from "../components/Hero.jsx";
import Features from "../components/Features.jsx";
import Stats from "../components/Stats.jsx";
import Footer from "../components/Footer.jsx";

const Home = () => (
  <div className="min-h-screen bg-slate-950">
    <NavBar />
    <main>
      <Hero />
      <Features />
      <Stats />
    </main>
    <Footer />
  </div>
);

export default Home;
