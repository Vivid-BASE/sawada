// ===================================
// Google Sheets Integration (Simple Client-Side)
// ===================================

// スプレッドシートIDを設定してください
// スプレッドシートのURLから取得: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';

// シート名の設定
const SHEETS = {
    SCHEDULE: 'Schedule',
    DISCOGRAPHY: 'Discography',
    PROJECTS: 'Projects',
    PAST_EVENTS: 'PastEvents',
    PROFILE: 'Profile',
    HISTORY: 'History'
};

/**
 * Googleスプレッドシートからデータを取得
 */
async function fetchSheetData(sheetName) {
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const csvText = await response.text();
        return parseCSV(csvText);
    } catch (error) {
        console.error(`Error fetching sheet "${sheetName}":`, error);
        return null;
    }
}

/**
 * CSVテキストをオブジェクトの配列に変換
 */
function parseCSV(csvText) {
    const rows = [];
    let currentRow = [];
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
    const data = [];

    for (let i = 1; i < rows.length; i++) {
        const row = {};
        headers.forEach((header, index) => {
            row[header] = rows[i][index] || '';
        });
        data.push(row);
    }

    return data;
}

/**
 * Googleスプレッドシートからデータを読み込んでJSONファイルを更新
 */
async function syncGoogleSheetsData() {
    if (SPREADSHEET_ID === 'YOUR_SPREADSHEET_ID_HERE') {
        console.log('⚠️ スプレッドシートIDが設定されていません');
        return;
    }

    try {
        console.log('📊 Googleスプレッドシートからデータを取得中...');

        // 全シートのデータを並行取得
        const [schedule, discography, projects, pastEvents, profile, history] = await Promise.all([
            fetchSheetData(SHEETS.SCHEDULE),
            fetchSheetData(SHEETS.DISCOGRAPHY),
            fetchSheetData(SHEETS.PROJECTS),
            fetchSheetData(SHEETS.PAST_EVENTS),
            fetchSheetData(SHEETS.PROFILE),
            fetchSheetData(SHEETS.HISTORY)
        ]);

        // 取得したデータをコンソールに出力(確認用)
        if (schedule) {
            console.log('✅ Schedule:', schedule.length, 'items');
            console.log(JSON.stringify(schedule, null, 2));
        }

        if (discography) {
            console.log('✅ Discography:', discography.length, 'items');
        }

        if (projects) {
            console.log('✅ Projects:', projects.length, 'items');
        }

        if (pastEvents) {
            console.log('✅ Past Events:', pastEvents.length, 'items');
        }

        if (profile) {
            console.log('✅ Profile data loaded');
        }

        if (history) {
            console.log('✅ History:', history.length, 'items');
        }

        console.log('\n✅ データ取得完了!');
        console.log('💡 上記のデータをコピーして、対応するdata/*.jsonファイルに貼り付けてください');

    } catch (error) {
        console.error('❌ エラー:', error);
    }
}

// ページ読み込み時に実行(開発モード用)
if (typeof window !== 'undefined') {
    window.syncGoogleSheetsData = syncGoogleSheetsData;
    console.log('💡 ブラウザのコンソールで syncGoogleSheetsData() を実行してデータを取得できます');
}

// Node.js環境で実行された場合
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { syncGoogleSheetsData, fetchSheetData, parseCSV };
}
