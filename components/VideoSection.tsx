import styles from './VideoSection.module.css';

const VIDEOS = [
    {
        id: 'Df-33TumsGo',
        title: '曼珠沙華',
        description: '情熱的な歌声と三味線の音色が響き渡る一曲。'
    },
    {
        id: 'CJNENZrV3xo',
        title: '東京ロンリー',
        description: '都会の孤独と哀愁を歌い上げた名曲。'
    },
    {
        id: 'n542lrjxtF4',
        title: '君を奪い去りたい',
        description: 'コラボレーション企画での熱演。'
    },
    {
        id: 'fHraouMlgak',
        title: '親父節',
        description: '心に響く親父節の熱唱。'
    },
    {
        id: 'f3YWLVqa4XI',
        title: '親父節',
        description: '魂を込めた親父節のパフォーマンス。'
    },
    {
        id: 'yBVHn11Io64',
        title: '親父節',
        description: '伝統と情熱が融合した親父節。'
    }
];

export default function VideoSection() {
    return (
        <section className={`section ${styles.section}`}>
            <div className="container">
                <h2 className="section-title fade-in-up">Movies</h2>
                <div className={styles.grid}>
                    {VIDEOS.map((video, index) => (
                        <div key={video.id} className={`${styles.card} fade-in-up delay-${(index + 1) * 100}`}>
                            <div className={styles.wrapper}>
                                <iframe
                                    src={`https://www.youtube.com/embed/${video.id}`}
                                    title={video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className={styles.iframe}
                                ></iframe>
                            </div>
                            <h3 className={styles.title}>{video.title}</h3>
                            <p className={styles.description}>{video.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
