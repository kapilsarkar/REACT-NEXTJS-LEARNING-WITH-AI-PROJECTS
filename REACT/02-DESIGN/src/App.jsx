import Card from "./components/Card.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import NavBar from "./components/NavBar.jsx";

function App() {
  return (
    <>
    <NavBar />
      <Hero />
      <Header />
      <h2 className="text-center text-2xl border-2 p-5 rounded-xl font-bold bg-violet-900 text-white">
        React App
      </h2>

      <div className=" flex flex-wrap justify-center items-center gap-5">
        <Card
          title="Buy Now"
          buttonText="Buy Now"
          imageURL="https://c.pxhere.com/photos/6c/65/kingfisher_animal_avian_beak_bird_feathers_hd_wallpaper_little-1176153.jpg!s2"
          alt="Sample Image"
        />
        <Card
          title="Join Now"
          buttonText="Join Now"
          imageURL="https://images.pexels.com/photos/34293422/pexels-photo-34293422.jpeg"
        />
        <Card
          title="Join Now"
          buttonText="Join Now"
          imageURL="https://images.pexels.com/photos/36552743/pexels-photo-36552743.jpeg"
        />
      </div>
    </>
  );
}

export default App;
