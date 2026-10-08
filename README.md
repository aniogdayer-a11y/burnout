# Pause & Bloom

A cozy, responsive sage green website built with plain HTML, CSS, and JavaScript. Three pages: a 25-second calming timer, eight animated reminders, and a five-question self-care quiz with a closing reflection. No build step or backend needed.

## Open locally

Double-click `index.html` to open the website in your browser. All illustrations are included locally. Google Fonts is optional; system fonts are used when offline.

## Put it on GitHub Pages

1. Create a new repository on GitHub, for example `pause-and-bloom`.
2. Choose **Add file → Upload files** and upload `index.html`, `reminders.html`, `quiz.html`, `styles.css`, `script.js`, `timer.js`, `quiz.js`, `bonk.js`, `fresh-start.js`, `.nojekyll`, and the entire `assets` folder. Keep all three HTML files at the repository root. You can also upload this README and `.gitignore`.
3. Commit the uploaded files.
4. Open the repository's **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the `main` branch and `/ (root)`, then **Save**.
7. Once deployment finishes, GitHub displays your website address, usually `https://YOUR-USERNAME.github.io/pause-and-bloom/`.

Reference: [GitHub Pages publishing settings](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

If you already have a repository, copy these files into it, commit, and push. No GitHub account, remote repository, or deployment has been configured by this project.

## Edit the site

- `index.html`: front page with a 25-second timer and gentle breathing guide.
- `reminders.html`: second page with eight reminders and a link to the quiz.
- `quiz.html`: third page with quiz layout, closing message, and return-home link.
- `timer.js`: start, pause, resume, reset, and elapsed-time countdown. The Continue link appears after the 25-second timer finishes. Refreshing starts a fresh session.
- `styles.css`: sage green colors, typography, and responsive layout.
- `script.js`: eight reminders, scroll effects, and shared motion controls.
- `quiz.js`: five quiz questions, feedback, progress, and completion.
- `assets/`: nine animated GIFs, matching still images for reduced motion, and favicon.
- `tools/create-art.ps1` and `tools/combine-gifs.py`: optional original illustration generator; requires Windows PowerShell and Python. Website visitors need neither.

The quiz keeps progress only while the page is open. Wrong answers allow retries; correct answers unlock the Next button. Finishing the fifth question reveals the closing section. Restart returns to the home page; opening the quiz again starts a fresh session. Visitors can pause animations, and the site honors their reduced-motion preference. Existing GIFs remain in place until replacement images are supplied.
