# 澤田慶仁 ウェブサイト用スプレッドシートデータ

このフォルダには、Googleスプレッドシートで管理するための全データが含まれています。

## 📊 Googleスプレッドシートの作成方法

### ステップ1: 新しいスプレッドシートを作成
1. [Google Sheets](https://sheets.google.com/)にアクセス
2. 「空白」をクリックして新しいスプレッドシートを作成
3. タイトルを「澤田慶仁 ウェブサイトコンテンツ」などに変更

### ステップ2: CSVファイルをインポート
以下の順番で各CSVファイルをインポートしてください：

#### 1. Schedule（今後のイベント）
- 「ファイル」→「インポート」→「アップロード」
- `schedule.csv` を選択
- インポート場所: 「新しいシートを挿入」
- シート名を「Schedule」に変更

#### 2. PastEvents（過去のイベント）
- 同様に `past_events.csv` をインポート
- シート名を「PastEvents」に変更

#### 3. Discography（ディスコグラフィー）
- `discography.csv` をインポート
- シート名を「Discography」に変更

#### 4. Projects（プロジェクト）
- `projects.csv` をインポート
- シート名を「Projects」に変更

#### 5. Profile（プロフィール）
- `profile.csv` をインポート
- シート名を「Profile」に変更

#### 6. History（経歴）
- `history.csv` をインポート
- シート名を「History」に変更

### ステップ3: スプレッドシートを公開
1. 「ファイル」→「共有」→「ウェブに公開」
2. 「公開」をクリック
3. スプレッドシートのURLからIDをコピー
   - URL例: `https://docs.google.com/spreadsheets/d/【ここがID】/edit`

### ステップ4: ウェブサイトに設定
詳細は [`../docs/GOOGLE_SHEETS_SETUP.md`](../docs/GOOGLE_SHEETS_SETUP.md) を参照してください。

---

## 📁 ファイル一覧

| ファイル名 | 内容 | データ件数 | シート名 |
|-----------|------|-----------|---------|
| `schedule.csv` | 今後のイベント | 7件 | Schedule |
| `past_events.csv` | 過去のイベント | 14件 | PastEvents |
| `discography.csv` | ディスコグラフィー | 11件 | Discography |
| `projects.csv` | プロジェクト | 3プロジェクト、11イベント | Projects |
| `profile.csv` | プロフィール情報 | 完全 | Profile |
| `history.csv` | 経歴 | 11項目 | History |

---

## ✅ 完成イメージ

Googleスプレッドシートは以下のような構造になります：

```
澤田慶仁 ウェブサイトコンテンツ
├── Schedule (シート1)
├── PastEvents (シート2)
├── Discography (シート3)
├── Projects (シート4)
├── Profile (シート5)
└── History (シート6)
```

**1つのスプレッドシートに6つのシート（タブ）が含まれる形**になります。

---

## 💡 使い方のヒント

- スプレッドシート上で直接編集すれば、ウェブサイトのコンテンツを簡単に更新できます
- 画像のパスは `/images/` から始まる相対パスで記述してください
- 日付形式は統一してください（例: 2026/01/04）
- カンマを含むテキストは自動的にダブルクォートで囲まれます

---

## 🔗 関連ドキュメント

- [詳細なセットアップガイド](../docs/GOOGLE_SHEETS_SETUP.md)
- [ユーザーガイド](../docs/USER_GUIDE.md)
