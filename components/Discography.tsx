"use client";

import { useState } from 'react';
import Image from 'next/image';
import styles from './Discography.module.css';
import discData from '@/data/discography.json';
import EventModal from './EventModal';
import { getImagePath } from '@/utils/imagePath';

export default function Discography() {
    const [selectedItem, setSelectedItem] = useState<typeof discData[0] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleItemClick = (item: typeof discData[0]) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    return (
        <section id="discography" className={`section ${styles.section}`}>
            <div className="container">
                <h2 className="section-title fade-in-up">Discography & Goods</h2>
                <div className={styles.grid}>
                    {discData.map((item, index) => (
                        <div
                            key={item.id}
                            className={`${styles.card} fade-in-up delay-${(index % 3 + 1) * 100}`}
                            onClick={() => handleItemClick(item)}
                            style={{ cursor: 'pointer' }}
                        >
                            {item.image && !item.image.includes('placehold.co') ? (
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={item.image.startsWith('http') ? item.image : getImagePath(item.image)}
                                        alt={item.title}
                                        width={300}
                                        height={300}
                                        style={{ width: '100%', height: 'auto', display: 'block' }}
                                    />
                                </div>
                            ) : (
                                <div className={styles.imageWrapper}>
                                    <div className={styles.noImage}>
                                        <span className={styles.noImageText}>No Image</span>
                                        <span className={styles.noImageSub}>{item.title}</span>
                                    </div>
                                </div>
                            )}
                            <div className={styles.info}>
                                <p className={styles.date}>{item.releaseDate}</p>
                                <h3 className={styles.title}>{item.title}</h3>
                                <p className={styles.price}>{item.price}</p>
                                {item.link && (
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className={styles.linkButton} onClick={(e) => e.stopPropagation()}>
                                        試聴・ご購入はこちら
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedItem && (
                <EventModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    title={selectedItem.title}
                    date={selectedItem.releaseDate}
                    image={selectedItem.image}
                    description={selectedItem.description}
                    link={selectedItem.link}
                    couplings={selectedItem.couplings}
                    productCode={selectedItem.productCode}
                />
            )}
        </section>
    );
}
