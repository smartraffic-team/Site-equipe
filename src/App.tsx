import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Team from './components/Team';
import Technologies from './components/Technologies';
import Project from './components/Project';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        <div data-aos="fade-down">
          <About />
        </div>

        <div data-aos="fade-down">
          <Team />
        </div>

        <div data-aos="fade-down" data-aos-duration="900">
          <Technologies />
        </div>

        <Project data-aos="fade-down" />
      </main>
      <Footer />
    </>
  );
}