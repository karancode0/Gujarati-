# Gujarat LL Practice
Practice website for the two-wheeler Learner's Licence theory test. **Not an official RTO site; questions are original practice items, not the real exam.**

## Run
Open `index.html` in a browser. No server, login, API key or build step.

## Files
`index.html`, `css/style.css`, `js/app.js` (UI + quiz engine), `js/questions.js`, `js/signs.js`, `js/storage.js`, `assets/` (reserved for extra images).

## Add questions
In `js/questions.js` add a row to `RAW`: `[id, topic, difficulty, question, [A,B,C,D], correctIndex, explanation, optionalSignId]`. Topic keys are in `TOPICS`. Add the 8th item (a sign id) to make it an image question. For translations, switch a question to the object form with `question:{en,gu,hi}` and `options:{en,gu,hi}`; missing languages fall back to English.

## Add signs
Add an object to `SIGNS` in `js/signs.js` (`shape`, glyph SVG `g`, names, description, tip). A sign-meaning question is generated automatically. For a photo/external image set `image:"assets/images/signs/x.svg"` on a question; a message is shown if it is missing.

## Exam settings
Question count, minutes and pass mark are chosen on the Mock Test page. They are practice settings, not official standards.

## Storage
`localStorage` key `gujaratLL.v1` stores language, theme, stats, incorrect questions and test history. Invalid data resets safely.

## Image sources
All sign graphics are original SVG illustrations generated in `js/signs.js` (no downloaded images). Details are simplified; compare with official sign charts.

## Limitations
Fewer than 150 questions currently; theory questions are English-only (sign questions and UI are in EN/GU/HI). Rules vary by state and change over time. Verify at official sources: Parivahan (https://parivahan.gov.in) and the Ministry of Road Transport & Highways (https://morth.nic.in).
