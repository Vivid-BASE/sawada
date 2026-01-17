# スプレッドシート用CSVテンプレート

このフォルダには、Googleスプレッドシートにインポートするための既存データ入りCSVファイルが含まれています。

## ファイル一覧

| ファイル名 | 内容 | データ件数 |
|-----------|------|-----------|
| `schedule.csv` | 今後のイベント | 7件 |
| `past_events.csv` | 過去のイベント | 14件 |
| `discography.csv` | ディスコグラフィー | 11件 |
| `projects.csv` | プロジェクト | 3プロジェクト、11イベント |
| `profile.csv` | プロフィール情報 | 完全 |
| `history.csv` | 経歴 | 11項目 |

## 使い方

詳細な手順は [`GOOGLE_SHEETS_SETUP.md`](../GOOGLE_SHEETS_SETUP.md) を参照してください。

### 簡単な手順:

1. 新しいGoogleスプレッドシートを作成
2. 各CSVファイルを「ファイル」→「インポート」でアップロード
3. シート名を変更:
   - `schedule.csv` → `Schedule`
   - `past_events.csv` → `PastEvents`
   - `discography.csv` → `Discography`
   - `projects.csv` → `Projects`
   - `profile.csv` → `Profile`
   - `history.csv` → `History`
4. スプレッドシートを「ウェブに公開」
5. スプレッドシートIDを `public/sheets-sync.js` に設定

## データ形式の説明

### Schedule (今後のイベント)
- **id**: イベントID
- **date**: 日付
- **place**: 場所
- **title**: タイトル
- **description**: 説明
- **image**: 画像パス

### PastEvents (過去のイベント)
- **id**: イベントID
- **title**: タイトル
- **date**: 日付
- **image**: 画像パス

### Discography (ディスコグラフィー)
- **id**: ID
- **title**: タイトル
- **releaseDate**: リリース日
- **price**: 価格
- **image**: 画像パス
- **link**: 購入リンク
- **productCode**: 品番
- **couplings**: カップリング曲(カンマ区切り)
- **description**: 説明

### Projects (プロジェクト)
- **projectId**: プロジェクトID(同じIDで複数行=複数イベント)
- **projectTitle**: プロジェクトタイトル
- **projectDescription**: プロジェクト説明
- **projectImage**: プロジェクト画像
- **eventId**: イベントID
- **eventTitle**: イベントタイトル
- **eventDate**: イベント日付
- **eventImage**: イベント画像
- **eventDescription**: イベント説明

### Profile (プロフィール)
- **field**: フィールド名
- **value**: 値

### History (経歴)
- **year**: 年
- **title**: タイトル
- **description**: 説明

## 注意事項

- CSVファイルはUTF-8エンコーディングです
- カンマを含むテキストは自動的にダブルクォートで囲まれています
- Googleスプレッドシートにインポート後、自由に編集できます
- 編集後は `syncGoogleSheetsData()` を実行してJSONファイルを更新してください
