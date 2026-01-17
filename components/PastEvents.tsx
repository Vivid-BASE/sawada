"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './PastEvents.module.css';
import pastEventsJson from '@/data/past_events.json';
import EventModal from './EventModal';
import { getImagePath } from '@/utils/imagePath';
import { fetchSheetData, SHEET_NAMES } from '@/utils/sheetsClient';

export default function PastEvents() {
    const [pastEvents, setPastEvents] = useState(pastEventsJson);
    const [selectedEvent, setSelectedEvent] = useState<typeof pastEventsJson[0] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const loadSheetData = async () => {
            const sheetData = await fetchSheetData(SHEET_NAMES.PAST_EVENTS);
            if (sheetData && sheetData.length > 0) {
                setPastEvents(sheetData as typeof pastEventsJson);
                console.log('✅ Past Events data loaded from Google Sheets');
            }
        };
        loadSheetData();
    }, []);

    const handleEventClick = (event: typeof pastEventsJson[0]) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    };

    return (
        <section id="past-events" className={`section ${styles.section}`}>
            <div className="container">
                <h2 className="section-title fade-in-up">Past Events</h2>
                <div className={styles.grid}>
                    {pastEvents.map((event, index) => (
                        <div
                            key={event.id}
                            className={`${styles.card} fade-in-up delay-${(index % 3 + 1) * 100}`}
                            onClick={() => handleEventClick(event)}
                            style={{ cursor: 'pointer' }}
                        >
                            {event.image && !event.image.includes('placehold.co') ? (
                                <div className={styles.imageWrapper}>
                                    <img
                                        src={event.image.startsWith('http') ? event.image : getImagePath(event.image)}
                                        alt={event.title}
                                        className={styles.image}
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                </div>
                            ) : (
                                <div className={styles.imageWrapper}>
                                    <div className={styles.noImage}>
                                        <span className={styles.noImageText}>No Image</span>
                                    </div>
                                </div>
                            )}
                            <div className={styles.info}>
                                <p className={styles.date}>{event.date}</p>
                                <h3 className={styles.title}>{event.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedEvent && (
                <EventModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    title={selectedEvent.title}
                    date={selectedEvent.date}
                    image={selectedEvent.image}
                />
            )}
        </section>
    );
}
