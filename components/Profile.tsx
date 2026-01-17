'use client';

import { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import profileDataJson from '@/data/profile.json';
import { getImagePath } from '@/utils/imagePath';
import { fetchSheetData, SHEET_NAMES } from '@/utils/sheetsClient';

interface ProfileData {
    name: string;
    nameReading: string;
    birthYear: number;
    birthPlace: string;
    biography: string[];
    images: {
        profile: string;
        hero: string[];
    };
}

interface ProfileRow {
    field: string;
    value: string;
}

export default function Profile() {
    const [profileData, setProfileData] = useState<ProfileData>(profileDataJson);

    useEffect(() => {
        async function loadProfileData() {
            try {
                const data = await fetchSheetData<ProfileRow>(SHEET_NAMES.PROFILE);

                if (data && data.length > 0) {
                    // Convert key-value CSV format to ProfileData object
                    const profileObj: any = {
                        biography: [],
                        images: { hero: [] }
                    };

                    data.forEach(row => {
                        const field = row.field;
                        const value = row.value;

                        // Skip if field is undefined or empty
                        if (!field) return;

                        if (field === 'name') {
                            profileObj.name = value;
                        } else if (field === 'nameReading') {
                            profileObj.nameReading = value;
                        } else if (field === 'birthYear') {
                            profileObj.birthYear = parseInt(value);
                        } else if (field === 'birthPlace') {
                            profileObj.birthPlace = value;
                        } else if (field.startsWith('biography')) {
                            // biography1, biography2, etc.
                            profileObj.biography.push(value);
                        } else if (field === 'profileImage') {
                            profileObj.images.profile = value;
                        } else if (field.startsWith('heroImage')) {
                            // heroImage1, heroImage2, etc.
                            profileObj.images.hero.push(value);
                        }
                    });

                    setProfileData(profileObj as ProfileData);
                    console.log('✅ Profile data loaded from Google Sheets');
                } else {
                    console.log('⚠️ No profile data from Google Sheets, using JSON fallback');
                }
            } catch (error) {
                console.error('❌ Error loading profile data from Google Sheets:', error);
                console.log('Using JSON fallback data');
            }
        }

        loadProfileData();
    }, []);

    return (
        <section id="profile" className={`section ${styles.section}`}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h2 className={styles.heading}>Profile</h2>
                    <h3 className={styles.name}>{profileData.name}</h3>
                    <p className={styles.subInfo}>{profileData.birthPlace}生まれ / {profileData.birthYear}年生</p>
                    <div className={styles.text}>
                        {profileData.biography.map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </div>
                </div>
                <div className={styles.imageWrapper}>
                    <img
                        src={getImagePath(profileData.images.profile)}
                        alt="Sawada Yasuhito Profile"
                        className={styles.profileImage}
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'block'
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
