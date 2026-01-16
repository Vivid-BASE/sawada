"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './HeroSlider.module.css';

const HERO_IMAGES = [
    "/images/hero1.jpg",
    "/images/hero2.jpg",
    "/images/hero3.jpg"
];

export default function HeroSlider() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className={styles.hero}>
            {HERO_IMAGES.map((src, index) => (
                <div
                    key={src}
                    className={`${styles.imageWrapper} ${index === currentImageIndex ? styles.active : ''}`}
                >
                    <Image
                        src={src}
                        alt={`Sawada Yasuhito Hero ${index + 1}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority={index === 0}
                        quality={95}
                        unoptimized
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
