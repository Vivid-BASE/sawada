"use client";

import { useState, useEffect } from 'react';
// import Image from 'next/image';
import styles from './HeroSlider.module.css';
import { getImagePath } from '@/utils/imagePath';
import profileData from '@/data/profile.json';

export default function HeroSlider() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const heroImages = profileData.images.hero;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [heroImages.length]);

    return (
        <section className={styles.hero}>
            {heroImages.map((src, index) => (
                <div
                    key={src}
                    className={`${styles.imageWrapper} ${index === currentImageIndex ? styles.active : ''}`}
                >
                    <img
                        src={getImagePath(src)}
                        alt={`Sawada Yasuhito Hero ${index + 1}`}
                        className={styles.heroImage}
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
            ))}

            <div className={styles.content}>
                <div className={styles.nameContainer}>
                    <h1 className={styles.verticalName}>
                        <span>澤</span>
                        <span>田</span>
                        <span>慶</span>
                        <span>仁</span>
                    </h1>
                    <p className={styles.englishName}>Yasuhito Sawada</p>
                </div>

                <div className={styles.catchphraseContainer}>
                    <p className={styles.catchphrase}>
                        <span>たかが百年</span>
                        <span>まだ夢の途中</span>
                    </p>
                </div>
            </div>
        </section>
    );
}
