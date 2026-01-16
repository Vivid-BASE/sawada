export default function Footer() {
    return (
        <footer style={{ padding: '40px 0', textAlign: 'center', backgroundColor: '#fff', borderTop: '1px solid #eee' }}>
            <p>&copy; {new Date().getFullYear()} Sawada Yasuhito. All rights reserved.</p>
        </footer>
    );
}
