# Save registrations to Google Sheets

Each form submission is appended as a new row in your Google Sheet via a free **Google Apps Script** web app (no backend server required).

## 1. Create the spreadsheet

1. Open [Google Sheets](https://sheets.google.com) and create a new spreadsheet, e.g. **DTW 2026 Registrations**.
2. Keep this tab open — you will attach the script to this file.

## 2. Add the script

1. In the spreadsheet menu: **Extensions → Apps Script**.
2. Delete any default code in `Code.gs`.
3. Copy everything from `google-apps-script/Registration.gs` in this repo and paste it into the editor.
4. Click **Save** (name the project e.g. `DTW Registration`).

## 3. Create the sheet headers (one time)

1. In Apps Script, select the function **`setupSheet`** in the toolbar dropdown.
2. Click **Run**.
3. Google will ask you to **Authorize** the script (your Google account → Advanced → Go to project → Allow).
4. Switch back to the spreadsheet — you should see a tab named **Registrations** with columns:

   | Timestamp | Name | Email | Organization | Position | Country | Events |

## 4. Deploy as a web app

1. In Apps Script: **Deploy → New deployment**.
2. Click the gear icon next to **Select type** → choose **Web app**.
3. Settings:
   - **Description:** `DTW registration API` (any label)
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**.
5. Copy the **Web app URL** — it looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

> If you change the script later, use **Deploy → Manage deployments → Edit → Version: New version → Deploy** so the live URL picks up changes.

## 5. Connect the website

1. In the project root, copy the example env file:
   ```bash
   cp .env.example .env.local
   ```
2. Edit `.env.local` and set:
   ```env
   VITE_REGISTRATION_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ID/exec
   ```
3. Restart the dev server (`npm run dev`) so Vite loads the new variable.

### Production (Vercel / Netlify / etc.)

Add the same variable in your host’s environment settings:

- **Name:** `VITE_REGISTRATION_SCRIPT_URL`
- **Value:** your `/exec` web app URL

Redeploy after saving.

## 6. Test

1. Open `/register` on the site and submit a test registration.
2. Refresh the Google Sheet — a new row should appear with timestamp and all fields.
3. **Events** are stored as a comma-separated list in one cell.

### Troubleshooting

| Problem | Fix |
|--------|-----|
| “Registration is not configured” | Add `VITE_REGISTRATION_SCRIPT_URL` to `.env.local` and restart `npm run dev`. |
| Submit fails / no row in sheet | Confirm deployment access is **Anyone**, URL ends with `/exec`, and you re-deployed after code changes. |
| Authorization errors in script | Run `setupSheet` again and complete Google authorization. |
| Old data missing headers | Run `setupSheet` once; it only adds headers if row 1 is empty or wrong. |

## Security note

The web app URL is public (anyone with the link could POST data). For a public event registration form this is usually acceptable. To reduce spam you can later add a secret token checked in `Registration.gs` and sent from the site via an env variable.
