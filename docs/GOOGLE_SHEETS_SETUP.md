# Google Sheets Integration - Setup Guide

## Overview
This guide explains how to set up Google Sheets integration so you can update website content by simply editing a Google Sheet.

---

## Part 1: Google Cloud Setup (One-time, ~15 minutes)

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: `sawada-website-sync`
4. Click "Create"

### Step 2: Enable Google Sheets API
1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google Sheets API"
3. Click on it and click "Enable"

### Step 3: Create Service Account
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Enter name: `sheets-sync-bot`
4. Click "Create and Continue"
5. Skip role selection (click "Continue")
6. Click "Done"

### Step 4: Generate Service Account Key
1. Click on the service account you just created
2. Go to "Keys" tab
3. Click "Add Key" → "Create new key"
4. Select "JSON" format
5. Click "Create"
6. **Save the downloaded JSON file securely** (you'll need it later)

---

## Part 2: Google Sheet Setup (One-time, ~10 minutes)

### Step 1: Create Google Sheet
1. Create a new Google Sheet
2. Name it: `Sawada Website Content`
3. Copy the Sheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   ```

### Step 2: Share Sheet with Service Account
1. Open the JSON key file you downloaded
2. Find the `client_email` field (looks like: `sheets-sync-bot@project-id.iam.gserviceaccount.com`)
3. In your Google Sheet, click "Share"
4. Paste the service account email
5. Set permission to "Viewer" (read-only)
6. Uncheck "Notify people"
7. Click "Share"

### Step 3: Create Sheet Tabs
Create the following tabs in your Google Sheet:

#### Tab 1: Schedule
| date | place | title | description | image |
|------|-------|-------|-------------|-------|
| 2024.03.15 | 東京文化会館 | 春のコンサート | 津軽三味線の演奏会 | /images/event1.jpg |

#### Tab 2: Discography
| id | title | releaseDate | productCode | price | image | description | couplings | links |
|----|-------|-------------|-------------|-------|-------|-------------|-----------|-------|
| 1 | たかが100年 | 2019.11.06 | YZWG-15232 | ¥1,200+税 | /images/discography/disco1.png | ... | 曲1,曲2,曲3 | {"amazon":"URL","tower":"URL"} |

**Note:** For `couplings`, separate songs with commas. For `links`, use JSON format.

#### Tab 3: Projects
| projectId | projectTitle | projectDescription | projectImage | eventId | eventTitle | eventDate | eventImage | eventDescription |
|-----------|--------------|-------------------|--------------|---------|------------|-----------|------------|------------------|
| 1 | ふるさとコンサート | 津軽三味線と歌で... | /images/project1.png | furusato-1 | ろまんちっく村 | 2023.07.09 | /images/p1.png | ... |
| 1 | ふるさとコンサート | 津軽三味線と歌で... | /images/project1.png | furusato-2 | ろまんちっく村 | 2023.01.21 | /images/p2.png | ... |

**Note:** Multiple rows with the same `projectId` will be grouped together.

#### Tab 4: PastEvents
| id | title | date | place | image | description |
|----|-------|------|-------|-------|-------------|
| past-1 | 2023年新春コンサート | 2023.01.15 | 東京 | /images/past1.jpg | ... |

#### Tab 5: Profile
| field | value |
|-------|-------|
| name | 澤田慶仁 |
| bio | 津軽三味線奏者... |
| image | /images/profile.jpg |

#### Tab 6: History
| year | events |
|------|--------|
| 2023 | イベント1,イベント2,イベント3 |
| 2022 | イベント1,イベント2 |

**Note:** Separate events with commas.

---

## Part 3: GitHub Setup (One-time, ~5 minutes)

### Step 1: Add GitHub Secrets
1. Go to your GitHub repository
2. Click "Settings" → "Secrets and variables" → "Actions"
3. Click "New repository secret"

**Secret 1: GOOGLE_SHEET_ID**
- Name: `GOOGLE_SHEET_ID`
- Value: Your Sheet ID from Part 2, Step 1

**Secret 2: GOOGLE_SERVICE_ACCOUNT_KEY**
- Name: `GOOGLE_SERVICE_ACCOUNT_KEY`
- Value: Entire contents of the JSON key file (copy and paste all of it)

### Step 2: Commit and Push Code
The sync script and workflow have already been created. Just commit and push:

```bash
git add .github/workflows/sync-sheets.yml scripts/sync-sheets.js
git commit -m "Add Google Sheets sync integration"
git push origin main
```

---

## Part 4: Testing (5 minutes)

### Step 1: Manual Trigger
1. Go to GitHub repository → "Actions" tab
2. Click "Sync Google Sheets Data" workflow
3. Click "Run workflow" → "Run workflow"
4. Wait for the workflow to complete (~1 minute)

### Step 2: Verify
1. Check the workflow run for any errors
2. If successful, check the repository for updated JSON files in `data/` folder
3. Wait for the website to rebuild (~2 minutes)
4. Visit your website and verify the content updated

---

## Daily Usage (Super Simple!)

Once setup is complete, updating the website is as easy as:

1. **Open the Google Sheet**
2. **Edit the content** (add/update/delete rows)
3. **Wait** (sync runs automatically every hour, or trigger manually via GitHub Actions)
4. **Done!** Website updates automatically

---

## Troubleshooting

### Sync fails with "Permission denied"
- Make sure you shared the sheet with the service account email
- Check that the service account has "Viewer" permission

### Sync fails with "Invalid credentials"
- Verify `GOOGLE_SERVICE_ACCOUNT_KEY` secret contains the entire JSON file contents
- Make sure there are no extra spaces or line breaks

### Data not updating on website
- Check GitHub Actions tab for workflow status
- Verify the workflow completed successfully
- Check if JSON files in `data/` folder were updated
- Wait for website deployment to complete (~2-3 minutes after sync)

### Manual sync not working
- Go to Actions → Sync Google Sheets Data → Run workflow
- Check the logs for error messages

---

## Support

If you encounter issues:
1. Check the GitHub Actions logs for detailed error messages
2. Verify all secrets are set correctly
3. Ensure the Google Sheet structure matches the templates above
