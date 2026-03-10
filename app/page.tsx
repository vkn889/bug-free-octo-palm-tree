import Cursor from './components/Cursor';
import VSCodeShell from './components/VSCodeShell';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Achievements from './components/Achievements';
import Contact from './components/Contact';

export default function Home() {
  return (
    <>
      <Cursor />
      <VSCodeShell>
        <Hero />
        <About />
        <Portfolio />
        <Achievements />
        <Contact />
      </VSCodeShell>
    </>
  );
}
