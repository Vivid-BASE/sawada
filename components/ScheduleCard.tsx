import Image from 'next/image';
import styles from './ScheduleCard.module.css';
import { getImagePath } from '@/utils/imagePath';

type Props = {
    date: string;
    place: string;
    title: string;
    description?: string;
    image?: string;
};

export default function ScheduleCard({ date, place, title, description, image }: Props) {
    return (
        <div className={styles.card}>
            {image && (
                <div className={styles.imageWrapper}>
                    <Image
                        src={image.startsWith('http') ? image : getImagePath(image)}
                        alt={title}
                        width={400}
                        height={300}
                        className={styles.eventImage}
                    />
                </div>
            )}
            <div className={styles.info}>
                <div className={styles.meta}>
                    <span className={styles.date}>{date}</span>
                    <span className={styles.place}>{place}</span>
                </div>
                <div className={styles.content}>
                    <h3 className={styles.title}>{title}</h3>
                    {description && <p className={styles.description}>{description}</p>}
                </div>
            </div>
        </div>
    );
}
