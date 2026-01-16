"use client";

import { useState } from 'react';
import Image from 'next/image';
import styles from './PastEvents.module.css';
import pastEvents from '@/data/past_events.json';
import EventModal from './EventModal';
import { getImagePath } from '@/utils/imagePath';

export default function PastEvents() {
    const [selectedEvent, setSelectedEvent] = useState<typeof pastEvents[0] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEventClick = (event: typeof pastEvents[0]) => {
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
                                    <Image
                                        src={event.image.startsWith('http') ? event.image : getImagePath(event.image)}
                                        alt={event.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className={styles.image}
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
