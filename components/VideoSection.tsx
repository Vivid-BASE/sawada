'use client';

import { useEffect, useState } from 'react';
import styles from './VideoSection.module.css';
import moviesDataJson from '@/data/movies.json';
import { fetchSheetData, SHEET_NAMES } from '@/utils/sheetsClient';

interface Movie {
    id: string;
    title: string;
    description: string;
}

export default function VideoSection() {
    const [moviesData, setMoviesData] = useState<Movie[]>(moviesDataJson);

    useEffect(() => {
        async function loadMoviesData() {
            try {
                const data = await fetchSheetData<Movie>(SHEET_NAMES.MOVIES);

                if (data && data.length > 0) {
                    setMoviesData(data);
                    console.log('✅ Movies data loaded from Google Sheets');
                } else {
                    console.log('⚠️ No movies data from Google Sheets, using JSON fallback');
                }
            } catch (error) {
                console.error('❌ Error loading movies data from Google Sheets:', error);
                console.log('Using JSON fallback data');
            }
        }

        loadMoviesData();
    }, []);

    return (
        <section className={`section ${styles.section}`}>
            <div className="container">
                <h2 className="section-title fade-in-up">Movies</h2>
                <div className={styles.grid}>
                    {moviesData.map((video, index) => (
                        <div key={video.id} className={`${styles.card} fade-in-up delay-${(index + 1) * 100}`}>
                            <div className={styles.wrapper}>
                                <iframe
                                    src={`https://www.youtube.com/embed/${video.id}`}
                                    title={video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className={styles.iframe}
                                ></iframe>
                            </div>
                            <h3 className={styles.title}>{video.title}</h3>
                            <p className={styles.description}>{video.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
