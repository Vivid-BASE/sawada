# Googleスプレッドシート連携 - セットアップガイド

## 概要
このガイドでは、Googleスプレッドシートを編集するだけでウェブサイトのコンテンツを更新できるようにする設定方法を説明します。

---

## パート1: Google Cloudのセットアップ(初回のみ、約15分)

### ステップ1: Google Cloudプロジェクトの作成
1. [Google Cloud Console](https://console.cloud.google.com/)にアクセス
2. 「プロジェクトを選択」→「新しいプロジェクト」をクリック
3. プロジェクト名を入力: `sawada-website-sync`
4. 「作成」をクリック

### ステップ2: Google Sheets APIの有効化
1. Google Cloud Consoleで「APIとサービス」→「ライブラリ」に移動
2. 「Google Sheets API」を検索
3. クリックして「有効にする」をクリック

### ステップ3: サービスアカウントの作成
1. 「APIとサービス」→「認証情報」に移動
2. 「認証情報を作成」→「サービスアカウント」をクリック
3. 名前を入力: `sheets-sync-bot`
4. 「作成して続行」をクリック
5. ロールの選択はスキップ(「続行」をクリック)
6. 「完了」をクリック

### ステップ4: サービスアカウントキーの生成
1. 作成したサービスアカウントをクリック
2. 「キー」タブに移動
3. 「鍵を追加」→「新しい鍵を作成」をクリック
4. 「JSON」形式を選択
5. 「作成」をクリック
6. **ダウンロードされたJSONファイルを安全に保存**(後で使用します)

---

## パート2: Googleスプレッドシートのセットアップ(初回のみ、約10分)

### ステップ1: Googleスプレッドシートの作成
1. 新しいGoogleスプレッドシートを作成
2. 名前を付ける: `Sawada Website Content`
3. URLからシートIDをコピー:
   ```
   https://docs.google.com/spreadsheets/d/シートID/edit
   ```

### ステップ2: サービスアカウントとシートを共有
1. ダウンロードしたJSONキーファイルを開く
2. `client_email`フィールドを探す(例: `sheets-sync-bot@project-id.iam.gserviceaccount.com`)
3. Googleスプレッドシートで「共有」をクリック
4. サービスアカウントのメールアドレスを貼り付け
5. 権限を「閲覧者」(読み取り専用)に設定
6. 「ユーザーに通知」のチェックを外す
7. 「共有」をクリック

### ステップ3: シートのタブを作成
Googleスプレッドシートに以下のタブを作成します:

#### タブ1: Schedule(スケジュール)
| date | place | title | description | image |
|------|-------|-------|-------------|-------|
| 2024.03.15 | 東京文化会館 | 春のコンサート | 津軽三味線の演奏会 | /images/event1.jpg |

#### タブ2: Discography(ディスコグラフィー)
| id | title | releaseDate | productCode | price | image | description | couplings | links |
|----|-------|-------------|-------------|-------|-------|-------------|-----------|-------|
| 1 | たかが100年 | 2019.11.06 | YZWG-15232 | ¥1,200+税 | /images/discography/disco1.png | ... | 曲1,曲2,曲3 | {"amazon":"URL","tower":"URL"} |

**注意:** `couplings`はカンマ区切りで曲名を入力。`links`はJSON形式で入力。

#### タブ3: Projects(プロジェクト)
| projectId | projectTitle | projectDescription | projectImage | eventId | eventTitle | eventDate | eventImage | eventDescription |
|-----------|--------------|-------------------|--------------|---------|------------|-----------|------------|------------------|
| 1 | ふるさとコンサート | 津軽三味線と歌で... | /images/project1.png | furusato-1 | ろまんちっく村 | 2023.07.09 | /images/p1.png | ... |
| 1 | ふるさとコンサート | 津軽三味線と歌で... | /images/project1.png | furusato-2 | ろまんちっく村 | 2023.01.21 | /images/p2.png | ... |

**注意:** 同じ`projectId`の複数行は1つのプロジェクトとしてグループ化されます。

#### タブ4: PastEvents(過去のイベント)
| id | title | date | place | image | description |
|----|-------|------|-------|-------|-------------|
| past-1 | 2023年新春コンサート | 2023.01.15 | 東京 | /images/past1.jpg | ... |

#### タブ5: Profile(プロフィール)
| field | value |
|-------|-------|
| name | 澤田慶仁 |
| bio | 津軽三味線奏者... |
| image | /images/profile.jpg |

#### タブ6: History(ヒストリー)
| year | events |
|------|--------|
| 2023 | イベント1,イベント2,イベント3 |
| 2022 | イベント1,イベント2 |

**注意:** イベントはカンマ区切りで入力。

---

## パート3: GitHubのセットアップ(初回のみ、約5分)

### ステップ1: GitHubシークレットの追加
1. GitHubリポジトリにアクセス
2. 「Settings」→「Secrets and variables」→「Actions」をクリック
3. 「New repository secret」をクリック

**シークレット1: GOOGLE_SHEET_ID**
- 名前: `GOOGLE_SHEET_ID`
- 値: パート2のステップ1で取得したシートID

**シークレット2: GOOGLE_SERVICE_ACCOUNT_KEY**
- 名前: `GOOGLE_SERVICE_ACCOUNT_KEY`
- 値: JSONキーファイルの内容全体(ファイルを開いて全てコピー&ペースト)

### ステップ2: コードのコミットとプッシュ
同期スクリプトとワークフローは既に作成済みです。以下のコマンドでコミットとプッシュを行います:

```bash
git add .github/workflows/sync-sheets.yml scripts/sync-sheets.js
git commit -m "Add Google Sheets sync integration"
git push origin main
```

---

## パート4: テスト(5分)

### ステップ1: 手動トリガー
1. GitHubリポジトリの「Actions」タブに移動
2. 「Sync Google Sheets Data」ワークフローをクリック
3. 「Run workflow」→「Run workflow」をクリック
4. ワークフローの完了を待つ(約1分)

### ステップ2: 確認
1. ワークフローの実行結果にエラーがないか確認
2. 成功した場合、リポジトリの`data/`フォルダ内のJSONファイルが更新されているか確認
3. ウェブサイトの再ビルドを待つ(約2分)
4. ウェブサイトにアクセスして、コンテンツが更新されているか確認

---

## 日常的な使い方(超簡単!)

セットアップが完了したら、ウェブサイトの更新は以下の手順だけです:

1. **Googleスプレッドシートを開く**
2. **内容を編集する**(行の追加/更新/削除)
3. **待つ**(毎時0分に自動同期、または手動でGitHub Actionsからトリガー)
4. **完了!** ウェブサイトが自動的に更新されます

---

## トラブルシューティング

### 同期が「Permission denied」で失敗する
- サービスアカウントのメールアドレスでシートを共有しているか確認
- サービスアカウントに「閲覧者」権限があるか確認

### 同期が「Invalid credentials」で失敗する
- `GOOGLE_SERVICE_ACCOUNT_KEY`シークレットにJSONファイルの内容全体が含まれているか確認
- 余分なスペースや改行がないか確認

### ウェブサイトのデータが更新されない
- GitHub Actionsタブでワークフローのステータスを確認
- ワークフローが正常に完了したか確認
- `data/`フォルダ内のJSONファイルが更新されたか確認
- ウェブサイトのデプロイが完了するまで待つ(同期後2〜3分)

### 手動同期が動作しない
- Actions → Sync Google Sheets Data → Run workflowに移動
- ログでエラーメッセージを確認

---

## サポート

問題が発生した場合:
1. GitHub Actionsのログで詳細なエラーメッセージを確認
2. すべてのシークレットが正しく設定されているか確認
3. Googleスプレッドシートの構造が上記のテンプレートと一致しているか確認
