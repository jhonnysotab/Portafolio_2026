import { useEffect } from 'react';
import Navbar from './components/organisms/Navbar/Navbar';
import Hero from './components/organisms/Hero/Hero';
import About from './components/organisms/About/About';
import Skills from './components/organisms/Skills/Skills';
import Projects from './components/organisms/Projects/Projects';
import TerminalSection from './components/organisms/TerminalSection/TerminalSection';
import Contact from './components/organisms/Contact/Contact';
import Footer from './components/organisms/Footer/Footer';
import CustomCursor from './components/atoms/CustomCursor/CustomCursor';
import ParticleBackground from './components/atoms/ParticleBackground/ParticleBackground';
import { useScrollReveal } from './hooks/useScrollReveal';
import styles from './App.module.css';
import Experience from './components/organisms/Experience/Experience';

function App() {
  useScrollReveal();

  return (
    <div className={styles.app}>
      <CustomCursor />
      <ParticleBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
         <Experience />
        <Projects />
        <TerminalSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;