const { google } = require('googleapis');
const fs = require('fs').promises;
const path = require('path');

// Google Sheets ID (to be set via environment variable)
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

// Service account credentials (from GitHub Secrets)
const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

/**
 * Fetch data from a specific sheet tab
 */
async function fetchSheetData(sheetName, range) {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: `${sheetName}!${range}`,
        });
        return response.data.values || [];
    } catch (error) {
        console.error(`Error fetching ${sheetName}:`, error.message);
        throw error;
    }
}

/**
 * Convert 2D array to array of objects using first row as keys
 */
function rowsToObjects(rows) {
    if (rows.length === 0) return [];
    const headers = rows[0];
    return rows.slice(1).map(row => {
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = row[index] || '';
        });
        return obj;
    });
}

/**
 * Sync Schedule data
 */
async function syncSchedule() {
    console.log('Syncing Schedule...');
    const rows = await fetchSheetData('Schedule', 'A:E');
    const data = rowsToObjects(rows);

    const schedule = data.map((row, index) => ({
        id: `schedule-${index + 1}`,
        date: row.date || '',
        place: row.place || '',
        title: row.title || '',
        description: row.description || '',
        image: row.image || '/images/default-event.jpg',
    }));

    await fs.writeFile(
        path.join(__dirname, '../data/schedule.json'),
        JSON.stringify(schedule, null, 2),
        'utf8'
    );
    console.log(`✓ Schedule synced: ${schedule.length} items`);
}

/**
 * Sync Discography data
 */
async function syncDiscography() {
    console.log('Syncing Discography...');
    const rows = await fetchSheetData('Discography', 'A:I');
    const data = rowsToObjects(rows);

    const discography = data.map(row => ({
        id: row.id || '',
        title: row.title || '',
        releaseDate: row.releaseDate || '',
        productCode: row.productCode || '',
        price: row.price || '',
        image: row.image || '/images/discography/default.png',
        description: row.description || '',
        couplings: row.couplings ? row.couplings.split(',').map(s => s.trim()) : [],
        links: row.links ? JSON.parse(row.links) : {},
    }));

    await fs.writeFile(
        path.join(__dirname, '../data/discography.json'),
        JSON.stringify(discography, null, 2),
        'utf8'
    );
    console.log(`✓ Discography synced: ${discography.length} items`);
}

/**
 * Sync Projects data
 */
async function syncProjects() {
    console.log('Syncing Projects...');
    const rows = await fetchSheetData('Projects', 'A:I');
    const data = rowsToObjects(rows);

    // Group events by project
    const projectsMap = new Map();

    data.forEach(row => {
        const projectId = row.projectId;
        if (!projectsMap.has(projectId)) {
            projectsMap.set(projectId, {
                id: projectId,
                title: row.projectTitle,
                description: row.projectDescription,
                image: row.projectImage,
                events: [],
            });
        }

        if (row.eventId) {
            projectsMap.get(projectId).events.push({
                id: row.eventId,
                title: row.eventTitle,
                date: row.eventDate,
                image: row.eventImage,
                description: row.eventDescription,
            });
        }
    });

    const projects = Array.from(projectsMap.values());

    await fs.writeFile(
        path.join(__dirname, '../data/projects.json'),
        JSON.stringify(projects, null, 2),
        'utf8'
    );
    console.log(`✓ Projects synced: ${projects.length} projects`);
}

/**
 * Sync Past Events data
 */
async function syncPastEvents() {
    console.log('Syncing Past Events...');
    const rows = await fetchSheetData('PastEvents', 'A:F');
    const data = rowsToObjects(rows);

    const pastEvents = data.map(row => ({
        id: row.id || '',
        title: row.title || '',
        date: row.date || '',
        place: row.place || '',
        image: row.image || '/images/default-event.jpg',
        description: row.description || '',
    }));

    await fs.writeFile(
        path.join(__dirname, '../data/past_events.json'),
        JSON.stringify(pastEvents, null, 2),
        'utf8'
    );
    console.log(`✓ Past Events synced: ${pastEvents.length} items`);
}

/**
 * Sync Profile data
 */
async function syncProfile() {
    console.log('Syncing Profile...');
    const rows = await fetchSheetData('Profile', 'A:B');
    const data = rowsToObjects(rows);

    const profile = {};
    data.forEach(row => {
        profile[row.field] = row.value;
    });

    await fs.writeFile(
        path.join(__dirname, '../data/profile.json'),
        JSON.stringify(profile, null, 2),
        'utf8'
    );
    console.log(`✓ Profile synced`);
}

/**
 * Sync History data
 */
async function syncHistory() {
    console.log('Syncing History...');
    const rows = await fetchSheetData('History', 'A:B');
    const data = rowsToObjects(rows);

    const history = data.map(row => ({
        year: row.year || '',
        events: row.events ? row.events.split(',').map(s => s.trim()) : [],
    }));

    await fs.writeFile(
        path.join(__dirname, '../data/history.json'),
        JSON.stringify(history, null, 2),
        'utf8'
    );
    console.log(`✓ History synced: ${history.length} years`);
}

/**
 * Main sync function
 */
async function main() {
    try {
        console.log('Starting Google Sheets sync...\n');

        await syncSchedule();
        await syncDiscography();
        await syncProjects();
        await syncPastEvents();
        await syncProfile();
        await syncHistory();

        console.log('\n✓ All data synced successfully!');
    } catch (error) {
        console.error('\n✗ Sync failed:', error.message);
        process.exit(1);
    }
}

main();
