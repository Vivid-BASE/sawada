// import Image from 'next/image';
import styles from './Profile.module.css';
import profileData from '@/data/profile.json';
import { getImagePath } from '@/utils/imagePath';

export default function Profile() {
    return (
        <section id="profile" className={`section ${styles.section}`}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h2 className={styles.heading}>Profile</h2>
                    <h3 className={styles.name}>{profileData.name}</h3>
                    <p className={styles.subInfo}>{profileData.birthPlace}生まれ / {profileData.birthYear}年生</p>
                    <div className={styles.text}>
                        {profileData.biography.map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </div>
                </div>
                <div className={styles.imageWrapper}>
                    <img
                        src={getImagePath(profileData.images.profile)}
                        alt="Sawada Yasuhito Profile"
                        className={styles.profileImage}
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'block'
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
