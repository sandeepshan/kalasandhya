# Kalasandhya 2026 — Installable App (PWA)

This is your Kalasandhya program coordination app, packaged as a **Progressive
Web App (PWA)**. That means committee members can install it on their phone
or laptop like a real app — home screen icon, full-screen (no browser bar),
and it still opens even with no internet connection.

It costs nothing to run. GitHub Pages hosting is free, and nothing here
needs a paid account, app store listing, or ongoing fee.

## Files in this folder

```
index.html              the app itself (same one you've been using)
manifest.json           tells the phone/browser this is an "app" — name, icon, colours
service-worker.js       makes the app shell load instantly and work offline
favicon.png             small icon shown in browser tabs
apple-touch-icon.png    icon used by iOS when added to the Home Screen
icons/                  full set of icon sizes for Android, Chrome, etc.
```

All six items need to be uploaded together, in the same folder structure, for
this to work. Don't rename `manifest.json` or `service-worker.js` — the code
in `index.html` refers to them by these exact names.

## Deploying on GitHub Pages

1. Create a new GitHub repository (public — Pages on a free GitHub account
   only serves public repos).
2. Upload **all the files in this folder**, keeping the `icons/` folder as a
   folder (don't flatten it).
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to "Deploy from a branch".
5. Set the branch to `main` (or whichever branch you uploaded to) and the
   folder to `/ (root)`.
6. Click **Save**. GitHub will give you a URL that looks like:
   `https://yourusername.github.io/your-repo-name/`
7. Wait a minute or two for the first deploy, then open that URL.

That's the link you share with the committee — the same one you'd use for
the "Add to Home Screen" step below.

### One important GitHub Pages detail

GitHub Pages serves your site from a sub-path
(`yourusername.github.io/your-repo-name/`), not the root of the domain. The
`manifest.json` in this package is already written to handle that correctly
(it uses relative paths like `./icons/icon-192.png` rather than absolute
ones), so you shouldn't need to change anything — just upload as-is.

## Installing the app (for you and the committee)

Once it's deployed and you open the GitHub Pages link:

**On Android (Chrome):**
A banner reading "Install Kalasandhya as an app" appears automatically near
the bottom of the screen. Tap **Install**. It'll appear on the home screen
like any other app.

**On iPhone/iPad (Safari):**
iOS doesn't support the automatic install banner. Instead:
1. Tap the **Share** icon (square with an arrow) at the bottom of Safari.
2. Scroll down and tap **Add to Home Screen**.
3. Tap **Add**.

**On a laptop (Chrome, Edge):**
Look for an install icon (a small monitor with a down arrow) in the address
bar, or use the same bottom banner if it appears. Click **Install**.

Once installed, opening it from the home screen / app icon launches it
full-screen, without any browser address bar — it feels like a native app.

## What works offline vs. what needs internet

- **The app itself** (all tabs, layout, the 34-program list) loads instantly
  and works fully offline once it's been opened once, thanks to the service
  worker.
- **Live sync between devices** (if you've set up Firebase) still needs an
  internet connection — that part can't work offline by nature, since it's
  about multiple people seeing the same live data. If you're offline, the
  app automatically falls back to saving in that device's local storage, the
  same as before, and picks back up syncing once you're back online.

## Updating the app later

If I send you an updated `index.html` in future, just re-upload that one
file to the same GitHub repo (overwriting the old one) — you don't need to
regenerate the manifest, service worker, or icons unless I specifically say
so. GitHub Pages will redeploy automatically within a minute or two of the
upload.

Committee members with the app already installed will get the update
automatically the next time they open it while online — the service worker
checks for a newer version in the background and swaps it in.
