import { Suspense, lazy } from 'react';
import Navbar from './components/organisms/Navbar/Navbar';
import Hero from './components/organisms/Hero/Hero';
import About from './components/organisms/About/About';
import Skills from './components/organisms/Skills/Skills';
import CustomCursor from './components/atoms/CustomCursor/CustomCursor';
import Ps1Background from './components/atoms/Ps1Background/Ps1Background';
import { useScrollReveal } from './hooks/useScrollReveal';
import styles from './App.module.css';

const Experience = lazy(() => import('./components/organisms/Experience/Experience'));
const Projects = lazy(() => import('./components/organisms/Projects/Projects'));
const TerminalSection = lazy(() => import('./components/organisms/TerminalSection/TerminalSection'));
const Contact = lazy(() => import('./components/organisms/Contact/Contact'));
const Footer = lazy(() => import('./components/organisms/Footer/Footer'));

function App() {
  useScrollReveal();

  return (
    <div className={styles.app}>
      <CustomCursor />
      <Ps1Background />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Suspense fallback={null}>
          <Experience />
          <Projects />
          <TerminalSection />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
