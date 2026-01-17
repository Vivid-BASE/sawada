import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import Profile from '@/components/Profile';
import History from '@/components/History';
import VideoSection from '@/components/VideoSection';
import Discography from '@/components/Discography';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Schedule from '@/components/Schedule';

export default function Home() {
  return (
    <div className="main-wrapper">
      <Header />
      <main>
        <HeroSlider />

        <div id="profile">
          <Profile />
        </div>

        <div id="history">
          <History />
        </div>

        <div id="movies">
          <VideoSection />
        </div>

        <div id="discography">
          <Discography />
        </div>

        <div id="projects">
          <Projects />
        </div>

        <div id="schedule">
          <Schedule />
        </div>

        <div id="contact">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
