'use client';

import { useEffect, useState } from 'react';
import ScheduleCard from './ScheduleCard';
import PastEvents from './PastEvents';
import scheduleDataJson from '@/data/schedule.json';
import { fetchSheetData, SHEET_NAMES } from '@/utils/sheetsClient';

interface ScheduleItem {
    id: string;
    date: string;
    place: string;
    title: string;
    description: string;
    image: string;
}

export default function Schedule() {
    const [scheduleData, setScheduleData] = useState<ScheduleItem[]>(scheduleDataJson);

    useEffect(() => {
        async function loadScheduleData() {
            try {
                const data = await fetchSheetData<ScheduleItem>(SHEET_NAMES.SCHEDULE);

                // Validate that data has required fields
                if (data && data.length > 0) {
                    const isValid = data.every(item =>
                        item.id && item.date && item.title && item.image
                    );

                    if (isValid) {
                        setScheduleData(data);
                        console.log('✅ Schedule data loaded from Google Sheets');
                    } else {
                        console.log('⚠️ Schedule data from Google Sheets is invalid, using JSON fallback');
                    }
                } else {
                    console.log('⚠️ No schedule data from Google Sheets, using JSON fallback');
                }
            } catch (error) {
                console.error('❌ Error loading schedule data from Google Sheets:', error);
                console.log('Using JSON fallback data');
            }
        }

        loadScheduleData();
    }, []);

    return (
        <section id="schedule" className="section">
            <div className="container">
                <h2 className="section-title fade-in-up">Schedule</h2>
                <div className="schedule-list">
                    {scheduleData.map((item, index) => (
                        <div key={item.id} className={`fade-in-up delay-${(index % 3 + 1) * 100}`}>
                            <ScheduleCard
                                date={item.date}
                                place={item.place}
                                title={item.title}
                                description={item.description}
                                image={item.image}
                            />
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '60px' }}>
                    <PastEvents />
                </div>
            </div>
        </section>
    );
}
