'use client';

import { useEffect, useState } from 'react';
import styles from './History.module.css';
import historyDataJson from '@/data/history.json';
import { fetchSheetData, SHEET_NAMES } from '@/utils/sheetsClient';

interface HistoryItem {
    year: string;
    title: string;
    description: string;
}

export default function History() {
    const [historyData, setHistoryData] = useState<HistoryItem[]>(historyDataJson);

    useEffect(() => {
        async function loadHistoryData() {
            try {
                const data = await fetchSheetData<HistoryItem>(SHEET_NAMES.HISTORY);

                if (data && data.length > 0) {
                    setHistoryData(data);
                    console.log('✅ History data loaded from Google Sheets');
                } else {
                    console.log('⚠️ No history data from Google Sheets, using JSON fallback');
                }
            } catch (error) {
                console.error('❌ Error loading history data from Google Sheets:', error);
                console.log('Using JSON fallback data');
            }
        }

        loadHistoryData();
    }, []);

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
