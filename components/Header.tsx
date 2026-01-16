'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className={styles.header}>
            <div className={`container ${styles.container}`}>
                <div className={styles.logo}>
                    <Link href="/">
                        <span className={styles.kamontop}></span>
                        澤田慶仁
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className={styles.nav}>
                    <Link href="#profile">Profile</Link>
                    <Link href="#history">History</Link>
                    <Link href="#discography">Discography</Link>
                    <Link href="#schedule">Schedule</Link>
                    <Link href="#contact">Contact</Link>
                </nav>

                {/* Hamburger Button (Mobile Only) */}
                <button
                    className={styles.hamburger}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.open : ''}`}>
                <button
                    className={styles.closeButton}
                    onClick={closeMobileMenu}
                    aria-label="Close menu"
                >
                    ×
                </button>
                <nav className={styles.mobileNav}>
                    <Link href="#profile" onClick={closeMobileMenu}>Profile</Link>
                    <Link href="#history" onClick={closeMobileMenu}>History</Link>
                    <Link href="#discography" onClick={closeMobileMenu}>Discography</Link>
                    <Link href="#schedule" onClick={closeMobileMenu}>Schedule</Link>
                    <Link href="#contact" onClick={closeMobileMenu}>Contact</Link>
                </nav>
            </div>
        </header>
    );
}
