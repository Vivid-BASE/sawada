import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.container}`}>
                <div className={styles.logo}>
                    <Link href="/">
                        <span className={styles.kamontop}></span>
                        澤田慶仁
                    </Link>
                </div>
                <nav className={styles.nav}>
                    <Link href="#profile">Profile</Link>
                    <Link href="#history">History</Link>
                    <Link href="#discography">Discography</Link>
                    <Link href="#schedule">Schedule</Link>
                    <Link href="#contact">Contact</Link>
                </nav>
            </div>
        </header>
    );
}
