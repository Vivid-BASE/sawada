import styles from './History.module.css';
import historyData from '@/data/history.json';

export default function History() {
    return (
        <section className={`section ${styles.section}`}>
            <div className="container">
                <h2 className="section-title fade-in-up">History</h2>
                <div className={styles.timeline}>
                    {historyData.map((item, index) => (
                        <div key={index} className={`${styles.item} fade-in-up delay-100`}>
                            <div className={styles.year}>{item.year}</div>
                            <div className={styles.content}>
                                <h3 className={styles.title}>{item.title}</h3>
                                <p className={styles.description}>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
