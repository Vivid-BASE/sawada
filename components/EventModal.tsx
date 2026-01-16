"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './EventModal.module.css';
import { getImagePath } from '@/utils/imagePath';

interface EventModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    image?: string;
    date?: string;
    link?: string;
    couplings?: string[];
    productCode?: string;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, title, description, image, date, link, couplings, productCode }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const handleBackdropClick = (event: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.backdrop} onClick={handleBackdropClick}>
            <div className={styles.modal} ref={modalRef}>
                <button className={styles.closeButton} onClick={onClose} aria-label="Close">
                    &times;
                </button>
                <div className={styles.content}>
                    {image && !image.includes('placehold.co') && (
                        <div className={styles.imageWrapper}>
                            <Image
                                src={image.startsWith('http') ? image : getImagePath(image)}
                                alt={title}
                                width={600}
                                height={400}
                                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                            />
                        </div>
                    )}
                    <div className={styles.textContainer}>
                        <h2 className={styles.title}>{title}</h2>
                        {date && <p className={styles.date}>{date}</p>}
                        {productCode && <p className={styles.productCode}>品番: {productCode}</p>}
                        {couplings && couplings.length > 0 && (
                            <div className={styles.couplings}>
                                <h3>カップリング曲</h3>
                                <ul>
                                    {couplings.map((song, index) => (
                                        <li key={index}>{song}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {description && <div className={styles.description}>
                            {description.split('\n').map((line, index) => (
                                <p key={index}>{line}</p>
                            ))}
                        </div>}
                        {link && (
                            <div className={styles.linkWrapper}>
                                <a href={link} target="_blank" rel="noopener noreferrer" className={styles.linkButton}>
                                    詳細を見る
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventModal;
