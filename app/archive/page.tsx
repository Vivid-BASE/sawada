import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './page.module.css';
import pastEvents from '@/data/past_events.json';

export default function Archive() {
    return (
        <div className="main-wrapper">
            <Header />
            <main className={`container ${styles.main}`}>
                <h1 className="section-title fade-in-up" style={{ marginTop: '40px' }}>Past Events Archive</h1>
                <p className={`${styles.intro} fade-in-up delay-100`}>
                    これまでに開催されたイベントの記録です。
                </p>

                <div className={styles.grid}>
                    {pastEvents.map((event, index) => (
                        <div key={event.id} className={`${styles.card} fade-in-up delay-${(index + 1) * 100}`}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    width={400}
                                    height={300}
                                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.info}>
                                <p className={styles.date}>{event.date}</p>
                                <h2 className={styles.title}>{event.title}</h2>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '60px', marginBottom: '40px' }}>
                    <Link href="/" className={styles.backButton}>
                        トップページに戻る
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
