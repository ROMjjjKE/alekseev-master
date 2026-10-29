import Header from './components/Header';
import Hero from './components/Hero';
import Index from './components/Index';
import Sheets from './components/Sheets';
import Tools from './components/Tools';
import Visit from './components/Visit';
import Faq from './components/Faq';
import Ask from './components/Ask';
import Footer from './components/Footer';
import { useLenis } from './components/useLenis';
import { useReveal } from './components/useReveal';

export default function App() {
  useLenis();
  useReveal('home');

  return (
    <>
      <a className="skip" href="#ukazatel">К содержанию</a>
      <Header />
      <main>
        <Hero />
        <Index />
        <Sheets />
        <Tools />
        <Visit />
        <Faq />
        <Ask />
      </main>
      <Footer />
    </>
  );
}
