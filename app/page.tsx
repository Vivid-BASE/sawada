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
import ScheduleCard from '@/components/ScheduleCard';
import PastEvents from '@/components/PastEvents';
import scheduleData from '@/data/schedule.json';

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

        <section id="schedule" className="section">
          <div className="container">
            <h2 className="section-title fade-in-up">Schedule</h2>
            <div className="schedule-list">
              {scheduleData.map((item, index) => (
                <div key={item.id} className={`fade-in-up delay-${(index % 3 + 1) * 100}`}>
                  <ScheduleCard
                    date={item.date}
                    place={item.place}
                    title={item.title}
                    description={item.description}
                    image={item.image}
                  />
                </div>
              ))}
            </div>

            <div style={{ marginTop: '60px' }}>
              <PastEvents />
            </div>
          </div>
        </section>

        <div id="contact">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
