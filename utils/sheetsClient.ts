/**
 * Google Sheets Client - Fetch and parse CSV data from public Google Sheets
 */

const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID || '1Rav00hRPrsKxC342RfPVD1NKtKLCRCA7i2NmnEwwR94';

export const SHEET_NAMES = {
    DISCOGRAPHY: 'discography',
    SCHEDULE: 'schedule',
    PAST_EVENTS: 'past_events',
    PROJECTS: 'projects',
    PROFILE: 'profile',
    HISTORY: 'history',
} as const;

export async function fetchSheetData<T = any>(sheetName: string): Promise<T[] | null> {
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}&headers=1`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const csvText = await response.text();
        return parseCSV<T>(csvText);
    } catch (error) {
        console.error(`Error fetching sheet "${sheetName}":`, error);
        return null;
    }
}

function parseCSV<T = any>(csvText: string): T[] {
    const rows: string[][] = [];
    let currentRow: string[] = [];
    let currentField = '';
    let inQuotes = false;
    let i = 0;

    while (i < csvText.length) {
        const char = csvText[i];
        const nextChar = csvText[i + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                currentField += '"';
                i += 2;
                continue;
            } else {
                inQuotes = !inQuotes;
                i++;
                continue;
            }
        }

        if (!inQuotes) {
            if (char === ',') {
                currentRow.push(currentField.trim());
                currentField = '';
                i++;
                continue;
            } else if (char === '\n' || char === '\r') {
                if (currentField || currentRow.length > 0) {
                    currentRow.push(currentField.trim());
                    if (currentRow.some(field => field.length > 0)) {
                        rows.push(currentRow);
                    }
                    currentRow = [];
                    currentField = '';
                }
                if (char === '\r' && nextChar === '\n') {
                    i += 2;
                } else {
                    i++;
                }
                continue;
            }
        }

        currentField += char;
        i++;
    }

    if (currentField || currentRow.length > 0) {
        currentRow.push(currentField.trim());
        if (currentRow.some(field => field.length > 0)) {
            rows.push(currentRow);
        }
    }

    if (rows.length < 2) return [];

    const headers = rows[0];
    const data: T[] = [];

    for (let i = 1; i < rows.length; i++) {
        const row: any = {};
        headers.forEach((header, index) => {
            row[header] = rows[i][index] || '';
        });
        data.push(row as T);
    }

    return data;
}
