"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Projects.module.css';
import projectsDataJson from '@/data/projects.json';
import EventModal from './EventModal';
import { getImagePath } from '@/utils/imagePath';
import { fetchSheetData, SHEET_NAMES } from '@/utils/sheetsClient';

type Event = {
    id: string;
    title: string;
    date: string;
    image: string;
    description: string;
};

type Project = {
    id: string;
    title: string;
    description: string;
    image: string;
    events: Event[];
};

export default function Projects() {
    const [projectsData, setProjectsData] = useState(projectsDataJson);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);

    useEffect(() => {
        const loadSheetData = async () => {
            const sheetData = await fetchSheetData(SHEET_NAMES.PROJECTS);
            if (sheetData && sheetData.length > 0) {
                setProjectsData(sheetData as typeof projectsDataJson);
                console.log('✅ Projects data loaded from Google Sheets');
            }
        };
        loadSheetData();
    }, []);

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        setIsProjectModalOpen(true);
    };

    const handleEventClick = (event: Event) => {
        setSelectedEvent(event);
        setIsEventModalOpen(true);
    };

    const handleCloseProjectModal = () => {
        setIsProjectModalOpen(false);
        setSelectedProject(null);
    };

    const handleCloseEventModal = () => {
        setIsEventModalOpen(false);
        setSelectedEvent(null);
    };

    return (
        <section id="projects" className={`section ${styles.section}`}>
            <div className="container">
                <h2 className={styles.heading}>Projects</h2>
                <div className={styles.grid}>
                    {(projectsData as Project[]).map((project) => (
                        <div
                            key={project.id}
                            className={styles.card}
                            onClick={() => handleProjectClick(project)}
                            style={{ cursor: 'pointer' }}
                        >
                            <h3 className={styles.title}>{project.title}</h3>
                            <p className={styles.description}>{project.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Project Events Modal */}
            {selectedProject && (
                <div
                    className={`${styles.modal} ${isProjectModalOpen ? styles.modalOpen : ''}`}
                    onClick={handleCloseProjectModal}
                >
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={handleCloseProjectModal}>
                            ×
                        </button>
                        <h2 className={styles.modalTitle}>{selectedProject.title}</h2>
                        <p className={styles.modalDescription}>{selectedProject.description}</p>

                        <div className={styles.eventsGrid}>
                            {selectedProject.events.map((event) => (
                                <div
                                    key={event.id}
                                    className={styles.eventCard}
                                    onClick={() => handleEventClick(event)}
                                >
                                    <div className={styles.eventImageWrapper}>
                                        <img
                                            src={event.image.startsWith('http') ? event.image : getImagePath(event.image)}
                                            alt={event.title}
                                            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className={styles.eventInfo}>
                                        <p className={styles.eventDate}>{event.date}</p>
                                        <h3 className={styles.eventTitle}>{event.title}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Individual Event Modal */}
            {selectedEvent && (
                <EventModal
                    isOpen={isEventModalOpen}
                    onClose={handleCloseEventModal}
                    title={selectedEvent.title}
                    date={selectedEvent.date}
                    image={selectedEvent.image}
                    description={selectedEvent.description}
                />
            )}
        </section>
    );
}
