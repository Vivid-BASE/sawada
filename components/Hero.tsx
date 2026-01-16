// import Image from 'next/image';
import { getImagePath } from '@/utils/imagePath';
import profileData from '@/data/profile.json';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.imageWrapper}>
                <img
                    src={getImagePath(profileData.images.hero[0])}
                    alt="Sawada Yasuhito Hero"
                    style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }}
                />
                <div className={styles.overlay}></div>
            </div>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    <span className={styles.mainName}>澤田慶仁</span>
                    <span className={styles.subName}>Yasuhito Sawada</span>
                </h1>
                <p className={styles.catchphrase}>
                    たかが100年、、、<br />
                    まだ夢の途中
                </p>
            </div>
        </section>
    );
}
