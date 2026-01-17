# Googleスプレッドシート連携 - 簡単セットアップ

## 概要
Googleスプレッドシートを編集するだけでウェブサイトのコンテンツを更新できます。
**LIKOサイトと同じシンプルな方法**を使用します。

---

## セットアップ手順(約10分)

### ステップ1: Googleスプレッドシートの作成

#### オプションA: 既存データをインポート(推奨)

`docs/spreadsheet_templates/` フォルダに既存データが入ったCSVファイルがあります:
- `schedule.csv` - 今後のイベント(7件)
- `past_events.csv` - 過去のイベント(14件)
- `discography.csv` - ディスコグラフィー(11件)
- `projects.csv` - プロジェクト(3プロジェクト、11イベント)
- `profile.csv` - プロフィール情報
- `history.csv` - 経歴(11項目)

**インポート手順:**

1. 新しいGoogleスプレッドシートを作成
2. 名前を付ける: `Sawada Website Content`
3. 各CSVファイルをインポート:
   - 「ファイル」→「インポート」をクリック
   - 「アップロード」タブを選択
   - CSVファイルをドラッグ&ドロップ
   - 「インポート場所」で「新しいシートを挿入」を選択
   - 「データをインポート」をクリック
   - シート名を変更:
     - `schedule.csv` → `Schedule`
     - `past_events.csv` → `PastEvents`
     - `discography.csv` → `Discography`
     - `projects.csv` → `Projects`
     - `profile.csv` → `Profile`
     - `history.csv` → `History`
4. 完了! 6つのタブが全て既存データ入りで作成されます

#### オプションB: 手動で作成

1. 新しいGoogleスプレッドシートを作成
2. 名前を付ける: `Sawada Website Content`
3. 以下の6つのタブを作成:

#### タブ1: Schedule
| date | place | title | description | image |
|------|-------|-------|-------------|-------|
| 2024.03.15 | 東京文化会館 | 春のコンサート | 津軽三味線の演奏会 | /images/event1.jpg |

#### タブ2: Discography
| id | title | releaseDate | productCode | price | image | description | couplings | links |
|----|-------|-------------|-------------|-------|-------|-------------|-----------|-------|
| 1 | たかが100年 | 2019.11.06 | YZWG-15232 | ¥1,200+税 | /images/discography/disco1.png | ... | 曲1,曲2,曲3 | {"amazon":"URL"} |

**注意:** `couplings`はカンマ区切り、`links`はJSON形式

#### タブ3: Projects
| projectId | projectTitle | projectDescription | projectImage | eventId | eventTitle | eventDate | eventImage | eventDescription |
|-----------|--------------|-------------------|--------------|---------|------------|-----------|------------|------------------|
| 1 | ふるさとコンサート | ... | /images/project1.png | event-1 | ろまんちっく村 | 2023.07.09 | /images/p1.png | ... |

**注意:** 同じ`projectId`で複数のイベントをグループ化

#### タブ4: PastEvents
| id | title | date | place | image | description |
|----|-------|------|-------|-------|-------------|
| past-1 | 2023年新春コンサート | 2023.01.15 | 東京 | /images/past1.jpg | ... |

#### タブ5: Profile
| field | value |
|-------|-------|
| name | 澤田慶仁 |
| bio | 津軽三味線奏者... |
| image | /images/profile.jpg |

#### タブ6: History
| year | events |
|------|--------|
| 2023 | イベント1,イベント2,イベント3 |

**注意:** イベントはカンマ区切り

---

### ステップ2: スプレッドシートを公開

1. 「ファイル」→「共有」→「ウェブに公開」をクリック
2. 「リンク」タブを選択
3. 「公開」をクリック
4. 確認ダイアログで「OK」をクリック

---

### ステップ3: スプレッドシートIDを取得

スプレッドシートのURLからIDをコピー:
```
https://docs.google.com/spreadsheets/d/【ここがID】/edit
```

例: `1DzwHNeIu2mrUDX9vYmB-jY3ZZwF0yU4blJHA_WKbsBc`

---

### ステップ4: スプレッドシートIDを設定

`public/sheets-sync.js`ファイルを開いて、6行目のIDを変更:

```javascript
const SPREADSHEET_ID = 'あなたのスプレッドシートID';
```

---

### ステップ5: データを同期

#### 方法1: ブラウザのコンソールで実行(推奨)

1. ウェブサイトをローカルで開く
2. ブラウザの開発者ツールを開く(F12キー)
3. コンソールタブを選択
4. 以下を入力して実行:
```javascript
syncGoogleSheetsData()
```
5. 出力されたJSONデータをコピー
6. 対応する`data/*.json`ファイルに貼り付け

#### 方法2: 自動更新(将来の拡張)

現在は手動コピーですが、将来的には自動更新機能を追加できます。

---

## 日常的な使い方

1. **Googleスプレッドシートを編集**
2. **ブラウザコンソールで `syncGoogleSheetsData()` を実行**
3. **出力されたJSONをコピーして `data/*.json` に貼り付け**
4. **コミット&プッシュ**
5. **完了!** ウェブサイトが更新されます

---

## メリット

✅ **超シンプル** - Google Cloud設定不要
✅ **サービスアカウント不要** - 認証情報の管理不要
✅ **GitHubシークレット不要** - セキュリティ設定が簡単
✅ **スプレッドシートIDだけ** - 1つの設定で完了

---

## トラブルシューティング

### データが取得できない
- スプレッドシートが「ウェブに公開」されているか確認
- スプレッドシートIDが正しいか確認
- タブ名が正確に一致しているか確認(大文字小文字も区別)

### JSONの形式が正しくない
- ヘッダー行(1行目)が正しいか確認
- 必須列が全て含まれているか確認

---

## 将来の拡張

必要に応じて、以下の機能を追加できます:
- ページ読み込み時の自動データ取得
- リアルタイム更新
- データのキャッシング
